from django.db import migrations


def set_secure_file_management_github_url(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Secure File Management System (CSE316)',
        category='data_science',
    ).update(
        github_url='https://github.com/manojagragari/SECURE-FILE-MANAGEMENT-SYSTEM/blob/main/sms.py'
    )


def revert_secure_file_management_github_url(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Secure File Management System (CSE316)',
        category='data_science',
    ).update(github_url='https://github.com/manojagragari')


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0017_add_secure_file_management_project'),
    ]

    operations = [
        migrations.RunPython(
            set_secure_file_management_github_url,
            revert_secure_file_management_github_url,
        ),
    ]
