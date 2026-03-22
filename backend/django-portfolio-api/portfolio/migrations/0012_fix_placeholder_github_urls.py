from django.db import migrations


def fix_placeholder_github_urls(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(github_url__icontains='your-username').update(
        github_url='https://github.com/manojagragari'
    )


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0011_dedupe_projects_add_unique_constraint'),
    ]

    operations = [
        migrations.RunPython(fix_placeholder_github_urls, migrations.RunPython.noop),
    ]
