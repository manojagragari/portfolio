from django.db import migrations


FREECODECAMP_CERT_URL = (
    'https://www.freecodecamp.org/certification/'
    'fccf4e3fcea-f3bd-4cff-ac2a-242a506f12c7/'
    'javascript-algorithms-and-data-structures'
)


def add_js_algorithms_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='FreeCodeCamp',
        title__icontains='JavaScript Algorithms',
    ).first()

    if cert is None:
        cert = Certification.objects.create(
            title='JavaScript Algorithms & Data Structures',
            issuer='FreeCodeCamp',
            year=2023,
            url=FREECODECAMP_CERT_URL,
            icon='📜',
            color='green',
        )

    cert.cover_image = 'certifications/covers/javascript-algorithms-ds-cover.png'
    cert.cert_image = 'certifications/docs/javascript-algorithms-ds-cert.png'
    cert.url = FREECODECAMP_CERT_URL

    if not cert.icon:
        cert.icon = '📜'
    if not cert.color:
        cert.color = 'green'

    cert.save()


def remove_js_algorithms_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='FreeCodeCamp',
        title__icontains='JavaScript Algorithms',
    ).first()

    if cert is None:
        return

    cert.cover_image = None
    cert.cert_image = None
    cert.save(update_fields=['cover_image', 'cert_image'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0023_add_cpp_oops_certificate_media'),
    ]

    operations = [
        migrations.RunPython(
            add_js_algorithms_certificate_media,
            remove_js_algorithms_certificate_media,
        ),
    ]
