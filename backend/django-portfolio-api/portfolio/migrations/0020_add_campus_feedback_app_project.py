from django.db import migrations


def add_campus_feedback_app_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.get_or_create(
        title='Campus Feedback App',
        category='android',
        defaults={
            'description': 'A modern Android app built with Jetpack Compose where students can submit semester-wise subject feedback, ratings, and grades in a clean Material 3 interface.',
            'long_description': 'Campus Feedback App is a modern Android application designed for student-centric academic feedback workflows. It includes a branded splash experience, semester-wise subject organization, an interactive 1-5 star rating flow, grade assignment for each subject, and a confirmation screen after submission. Built with Kotlin and Jetpack Compose, the app focuses on smooth state-driven UI updates and a responsive Material 3 user experience.',
            'features': [
                'Splash screen with app branding',
                'Semester-wise subject navigation',
                'Interactive star rating system (1-5)',
                'Grade assignment flow (A+, A, B, C)',
                'Success confirmation screen after feedback submission',
                'Responsive UI with Jetpack Compose and Material 3',
            ],
            'tech_stack': ['Kotlin', 'Jetpack Compose', 'Material 3', 'Android Studio'],
            'github_url': 'https://github.com/manojagragari',
            'apk_url': '/projects/campus-feedback-app.apk',
            'featured': True,
            'order': 4,
            'gradient': 'from-green-500/20 to-teal-500/20',
            'accent_color': 'green',
        },
    )


def remove_campus_feedback_app_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Campus Feedback App',
        category='android',
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0019_contactmessage'),
    ]

    operations = [
        migrations.RunPython(
            add_campus_feedback_app_project,
            remove_campus_feedback_app_project,
        ),
    ]
