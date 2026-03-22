from django.db import migrations, models


def dedupe_projects(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')

    seen = set()
    duplicates_to_delete = []

    # Keep latest record per (category, title), remove older duplicates.
    for project in Project.objects.order_by('category', 'title', '-id'):
        key = (project.category, project.title)
        if key in seen:
            duplicates_to_delete.append(project.id)
        else:
            seen.add(key)

    if duplicates_to_delete:
        Project.objects.filter(id__in=duplicates_to_delete).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0010_remove_data_analysis_project'),
    ]

    operations = [
        migrations.RunPython(dedupe_projects, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name='project',
            constraint=models.UniqueConstraint(fields=('category', 'title'), name='uniq_project_category_title'),
        ),
    ]
