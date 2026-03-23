from django.db import migrations


def update_js_algorithms_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='FreeCodeCamp',
        title__icontains='JavaScript Algorithms',
    ).first()

    if cert is None:
        return

    cert.cover_image = 'certifications/covers/javascript-algorithms-ds-cover.jpeg'
    cert.cert_image = 'certifications/docs/javascript-algorithms-ds-cert.jpeg'
    cert.save(update_fields=['cover_image', 'cert_image'])


def revert_js_algorithms_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='FreeCodeCamp',
        title__icontains='JavaScript Algorithms',
    ).first()

    if cert is None:
        return

    cert.cover_image = 'certifications/covers/javascript-algorithms-ds-cover.png'
    cert.cert_image = 'certifications/docs/javascript-algorithms-ds-cert.png'
    cert.save(update_fields=['cover_image', 'cert_image'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0024_add_js_algorithms_certificate_media'),
    ]

    operations = [
        migrations.RunPython(
            update_js_algorithms_certificate_media,
            revert_js_algorithms_certificate_media,
        ),
    ]
