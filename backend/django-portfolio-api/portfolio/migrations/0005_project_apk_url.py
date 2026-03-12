from django.db import migrations, models


def set_project_apk_urls(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Cricket Live & News Analytics App',
        category='android',
    ).update(apk_url='/projects/cricket-live-news-analytics-app.apk')


def clear_project_apk_urls(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Cricket Live & News Analytics App',
        category='android',
    ).update(apk_url=None)


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_add_cricket_android_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='apk_url',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.RunPython(set_project_apk_urls, clear_project_apk_urls),
    ]