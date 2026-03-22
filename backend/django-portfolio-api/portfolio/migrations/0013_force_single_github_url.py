from django.db import migrations


TARGET_GITHUB_URL = 'https://github.com/manojagragari'


def force_single_github_url(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Profile = apps.get_model('portfolio', 'Profile')

    Project.objects.exclude(github_url=TARGET_GITHUB_URL).update(github_url=TARGET_GITHUB_URL)
    Profile.objects.exclude(github_url=TARGET_GITHUB_URL).update(github_url=TARGET_GITHUB_URL)


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0012_fix_placeholder_github_urls'),
    ]

    operations = [
        migrations.RunPython(force_single_github_url, migrations.RunPython.noop),
    ]
