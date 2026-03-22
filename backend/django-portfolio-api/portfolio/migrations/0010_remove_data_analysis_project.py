from django.db import migrations


def remove_data_analysis_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(title='Data Analysis & Visualization Suite', category='data_science').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0009_profile_gallery_images_cert_achievement_fields'),
    ]

    operations = [
        migrations.RunPython(remove_data_analysis_project, migrations.RunPython.noop),
    ]
