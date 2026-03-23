import json

from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand, CommandError

from portfolio.models import Achievement, Certification, Profile, Project, ProjectGalleryImage


class Command(BaseCommand):
    help = "Check DB media references and report missing files."

    def add_arguments(self, parser):
        parser.add_argument(
            "--base-url",
            default="",
            help="Optional absolute base URL (for HTTP checks), e.g. https://manoj-portfolio-api.onrender.com",
        )
        parser.add_argument(
            "--api-root",
            default="",
            help="Optional API root to inspect deployed DB URLs, e.g. https://manoj-portfolio-api.onrender.com/api",
        )
        parser.add_argument(
            "--timeout",
            type=float,
            default=8.0,
            help="HTTP timeout in seconds when --base-url is used.",
        )
        parser.add_argument(
            "--fail-on-missing",
            action="store_true",
            help="Exit with non-zero status if any missing references are found.",
        )

    def handle(self, *args, **options):
        base_url = (options.get("base_url") or "").strip().rstrip("/")
        api_root = (options.get("api_root") or "").strip().rstrip("/")
        timeout = options.get("timeout", 8.0)
        fail_on_missing = options.get("fail_on_missing", False)

        if api_root:
            total_refs, ok, missing = self._check_api_media(api_root, base_url, timeout)
            mode = "API_HTTP"
        else:
            total_refs, ok, missing = self._check_db_media(base_url, timeout)
            mode = "HTTP" if base_url else "Storage"

        self.stdout.write(self.style.NOTICE("Media reference check complete"))
        self.stdout.write(f"Mode: {mode}")
        if api_root:
            self.stdout.write(f"API root: {api_root}")
        if base_url:
            self.stdout.write(f"Base URL: {base_url}")
        self.stdout.write(f"MEDIA_ROOT: {settings.MEDIA_ROOT}")
        self.stdout.write(f"Total references checked: {total_refs}")
        self.stdout.write(self.style.SUCCESS(f"Reachable: {ok}"))
        self.stdout.write(self.style.ERROR(f"Missing: {len(missing)}"))

        if missing:
            self.stdout.write("\nMissing references:")
            for row in missing:
                self.stdout.write(
                    f"- {row['source']} [{row['label']}] -> {row['ref']} :: {row['reason']}"
                    + (f" :: {row['url']}" if row.get("url") else "")
                )

        if fail_on_missing and missing:
            raise CommandError(f"Found {len(missing)} missing media references")

    def _check_db_media(self, base_url, timeout):
        checks = [
            (Project, "image", "project image"),
            (ProjectGalleryImage, "image", "gallery image"),
            (Certification, "cover_image", "cert cover"),
            (Certification, "cert_image", "cert document"),
            (Achievement, "cover_image", "achievement cover"),
            (Profile, "profile_image", "profile image"),
            (Profile, "cover_banner", "profile banner"),
        ]

        total_refs = 0
        missing = []
        ok = 0

        for model, field_name, label in checks:
            queryset = model.objects.exclude(**{f"{field_name}__isnull": True}).exclude(**{field_name: ""})
            for obj in queryset.iterator():
                file_field = getattr(obj, field_name, None)
                if not file_field or not getattr(file_field, "name", ""):
                    continue

                total_refs += 1
                rel_path = file_field.name
                storage_exists = default_storage.exists(rel_path)

                if base_url:
                    media_url = file_field.url
                    full_url = media_url if media_url.startswith("http") else urljoin(f"{base_url}/", media_url.lstrip("/"))
                    http_ok, status = self._check_http_url(full_url, timeout)
                    if http_ok:
                        ok += 1
                    else:
                        missing.append(
                            {
                                "source": f"{model.__name__}(id={obj.pk}) {field_name}",
                                "label": label,
                                "ref": rel_path,
                                "reason": f"HTTP {status}",
                                "url": full_url,
                            }
                        )
                else:
                    if storage_exists:
                        ok += 1
                    else:
                        missing.append(
                            {
                                "source": f"{model.__name__}(id={obj.pk}) {field_name}",
                                "label": label,
                                "ref": rel_path,
                                "reason": "STORAGE_MISSING",
                            }
                        )

        return total_refs, ok, missing

    def _check_api_media(self, api_root, base_url, timeout):
        media_refs = []

        projects = self._fetch_json(f"{api_root}/projects/", timeout)
        for project in projects:
            title = project.get("title") or "project"
            image = project.get("image")
            if image:
                media_refs.append({"source": f"Project:{title}", "label": "project image", "ref": image})
            for idx, gallery_item in enumerate(project.get("gallery_images") or [], start=1):
                gallery_image = gallery_item.get("image")
                if gallery_image:
                    media_refs.append(
                        {
                            "source": f"ProjectGallery:{title}#{idx}",
                            "label": "gallery image",
                            "ref": gallery_image,
                        }
                    )

        certifications = self._fetch_json(f"{api_root}/certifications/", timeout)
        for cert in certifications:
            cert_title = cert.get("title") or "certification"
            for field_name, label in (("cover_image", "cert cover"), ("cert_image", "cert document")):
                val = cert.get(field_name)
                if val:
                    media_refs.append({"source": f"Certification:{cert_title}", "label": label, "ref": val})

        achievements = self._fetch_json(f"{api_root}/achievements/", timeout)
        for item in achievements:
            title = item.get("title") or "achievement"
            val = item.get("cover_image")
            if val:
                media_refs.append({"source": f"Achievement:{title}", "label": "achievement cover", "ref": val})

        profile = self._fetch_json(f"{api_root}/profile/", timeout)
        for field_name, label in (("profile_image", "profile image"), ("cover_banner", "profile banner")):
            val = profile.get(field_name)
            if val:
                media_refs.append({"source": "Profile", "label": label, "ref": val})

        missing = []
        ok = 0
        for row in media_refs:
            full_url = row["ref"] if str(row["ref"]).startswith("http") else urljoin(f"{(base_url or api_root).rstrip('/')}/", str(row["ref"]).lstrip("/"))
            http_ok, status = self._check_http_url(full_url, timeout)
            if http_ok:
                ok += 1
            else:
                missing.append(
                    {
                        "source": row["source"],
                        "label": row["label"],
                        "ref": row["ref"],
                        "reason": f"HTTP {status}",
                        "url": full_url,
                    }
                )

        return len(media_refs), ok, missing

    def _fetch_json(self, url, timeout):
        req = Request(url, method="GET")
        try:
            with urlopen(req, timeout=timeout) as response:
                payload = response.read()
                return json.loads(payload.decode("utf-8"))
        except HTTPError as exc:
            raise CommandError(f"Failed to fetch {url}: HTTP {exc.code}")
        except URLError as exc:
            raise CommandError(f"Failed to fetch {url}: {exc.reason}")
        except Exception as exc:
            raise CommandError(f"Failed to fetch {url}: {exc}")

    def _check_http_url(self, url, timeout):
        req = Request(url, method="HEAD")
        try:
            with urlopen(req, timeout=timeout) as response:
                return 200 <= response.status < 400, response.status
        except HTTPError as exc:
            if exc.code == 405:
                return self._check_http_get(url, timeout)
            return False, exc.code
        except URLError:
            return False, "NETWORK"
        except Exception:
            return False, "ERROR"

    def _check_http_get(self, url, timeout):
        req = Request(url, method="GET")
        try:
            with urlopen(req, timeout=timeout) as response:
                return 200 <= response.status < 400, response.status
        except HTTPError as exc:
            return False, exc.code
        except URLError:
            return False, "NETWORK"
        except Exception:
            return False, "ERROR"
