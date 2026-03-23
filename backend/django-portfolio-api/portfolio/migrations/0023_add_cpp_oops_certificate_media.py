from django.db import migrations


def add_cpp_oops_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='Cipher School',
        title__icontains='C++ with OOPs',
    ).first()

    if cert is None:
        cert = Certification.objects.create(
            title='C++ with OOPs Programming Language',
            issuer='Cipher School',
            year=2025,
            url='https://www.cipherschools.com',
            icon='🔷',
            color='blue',
        )

    cert.cover_image = 'certifications/covers/cpp-oops-cover.png'
    cert.cert_image = 'certifications/docs/cpp-oops-cert.png'

    if not cert.url:
        cert.url = 'https://www.cipherschools.com'
    if not cert.icon:
        cert.icon = '🔷'
    if not cert.color:
        cert.color = 'blue'

    cert.save()


def remove_cpp_oops_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='Cipher School',
        title__icontains='C++ with OOPs',
    ).first()

    if cert is None:
        return

    cert.cover_image = None
    cert.cert_image = None
    cert.save(update_fields=['cover_image', 'cert_image'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0022_add_frontend_react_certificate_media'),
    ]

    operations = [
        migrations.RunPython(
            add_cpp_oops_certificate_media,
            remove_cpp_oops_certificate_media,
        ),
    ]
