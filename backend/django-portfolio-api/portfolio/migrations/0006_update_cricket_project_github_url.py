from django.db import migrations


def set_cricket_project_github_url(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Cricket Live & News Analytics App',
        category='android',
    ).update(github_url='https://github.com/manojagragari/Endterm1')


def restore_cricket_project_github_url(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Cricket Live & News Analytics App',
        category='android',
    ).update(github_url='https://github.com/your-username/cricket-live-news-analytics-app')


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0005_project_apk_url'),
    ]

    operations = [
        migrations.RunPython(set_cricket_project_github_url, restore_cricket_project_github_url),
    ]