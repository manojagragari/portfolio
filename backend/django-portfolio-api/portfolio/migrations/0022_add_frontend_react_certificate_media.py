from django.db import migrations


def add_frontend_react_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='HackerRank',
        title__icontains='Frontend Developer',
    ).first()

    if cert is None:
        cert = Certification.objects.create(
            title='Frontend Developer (React)',
            issuer='HackerRank',
            year=2026,
            url='https://www.hackerrank.com',
            icon='⚛️',
            color='cyan',
        )

    cert.cover_image = 'certifications/covers/frontend-developer-react-cover.jpg'
    cert.cert_image = 'certifications/docs/frontend-developer-react-cert.jpg'

    if not cert.url:
        cert.url = 'https://www.hackerrank.com'
    if not cert.icon:
        cert.icon = '⚛️'
    if not cert.color:
        cert.color = 'cyan'

    cert.save()


def remove_frontend_react_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='HackerRank',
        title__icontains='Frontend Developer',
    ).first()

    if cert is None:
        return

    cert.cover_image = None
    cert.cert_image = None
    cert.save(update_fields=['cover_image', 'cert_image'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0021_add_master_generative_ai_certificate_media'),
    ]

    operations = [
        migrations.RunPython(
            add_frontend_react_certificate_media,
            remove_frontend_react_certificate_media,
        ),
    ]
