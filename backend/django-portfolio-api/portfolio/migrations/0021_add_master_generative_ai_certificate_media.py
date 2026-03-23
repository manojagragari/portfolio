from django.db import migrations


def add_master_generative_ai_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='Infosys Springboard',
        title__icontains='Master Generative AI',
    ).first()

    if cert is None:
        cert = Certification.objects.create(
            title='Master Generative AI & Generative AI Tools',
            issuer='Infosys Springboard',
            year=2025,
            url='https://springboard.infosys.com',
            icon='🤖',
            color='purple',
        )

    cert.cover_image = 'certifications/covers/master-generative-ai-cover.jpg'
    cert.cert_image = 'certifications/docs/master-generative-ai-cert.jpg'

    if not cert.url:
        cert.url = 'https://springboard.infosys.com'
    if not cert.icon:
        cert.icon = '🤖'
    if not cert.color:
        cert.color = 'purple'

    cert.save()


def remove_master_generative_ai_certificate_media(apps, schema_editor):
    Certification = apps.get_model('portfolio', 'Certification')

    cert = Certification.objects.filter(
        issuer='Infosys Springboard',
        title__icontains='Master Generative AI',
    ).first()

    if cert is None:
        return

    cert.cover_image = None
    cert.cert_image = None
    cert.save(update_fields=['cover_image', 'cert_image'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0020_add_campus_feedback_app_project'),
    ]

    operations = [
        migrations.RunPython(
            add_master_generative_ai_certificate_media,
            remove_master_generative_ai_certificate_media,
        ),
    ]
