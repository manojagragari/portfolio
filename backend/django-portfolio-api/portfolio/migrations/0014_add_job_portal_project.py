# Generated migration to add Job Portal project

from django.db import migrations


def add_job_portal_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.get_or_create(
        title='Job Portal & Internship Portal',
        category='web',
        defaults={
            'description': 'A full-stack job and internship portal platform where companies can post jobs, users can register and apply with CV uploads, and applications are sent via email to companies.',
            'long_description': 'The Job Portal & Internship Portal is a production-ready full-stack application built with Django for learning and practical implementation. It provides a complete workflow for job management, user authentication, application handling, and email notifications. Companies can post and manage jobs with open/closed status, while students can discover opportunities, apply with CV uploads, and track their applications. The system automatically sends application notifications to company email addresses.',
            'features': [
                'Company job posting and management system',
                'Dynamic job status management (Open / Closed)',
                'User registration and authentication',
                'Job application with CV file upload',
                'Email notifications for job applications',
                'User-friendly Bootstrap 5 interface',
                'Complete form validation and file handling',
                'Job filtering and search capabilities'
            ],
            'tech_stack': ['Python', 'Django', 'Bootstrap 5', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
            'github_url': 'https://github.com/manojagragari',
            'featured': True,
            'order': 3,
            'gradient': 'from-indigo-500/20 to-purple-500/20',
            'accent_color': 'indigo'
        }
    )


def remove_job_portal_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Job Portal & Internship Portal',
        category='web'
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0013_force_single_github_url'),
    ]

    operations = [
        migrations.RunPython(add_job_portal_project, remove_job_portal_project),
    ]
