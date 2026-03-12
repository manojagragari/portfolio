from django.db import migrations


def add_android_calculator_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.update_or_create(
        title='Android Calculator App',
        category='android',
        defaults={
            'description': 'A fully functional calculator Android app built with XML UI and Kotlin logic for fast, responsive arithmetic operations.',
            'long_description': 'The Android Calculator App is a clean and responsive mobile application developed using XML for the user interface and Kotlin for backend logic. It supports essential arithmetic operations such as addition, subtraction, multiplication, and division with real-time result updates and optimized layout behavior across Android devices.',
            'features': [
                'Clean calculator UI designed using XML layouts',
                'Functional arithmetic operations (+, -, x, /)',
                'Button click handling and backend logic implementation',
                'Real-time result display',
                'Optimized layout for Android devices',
            ],
            'tech_stack': [
                'Kotlin',
                'Android Studio',
                'XML Layout Design',
                'Android SDK',
            ],
            'github_url': 'https://github.com/manojagragari/firstone',
            'apk_url': '/projects/android-calculator-app.apk',
            'live_url': None,
            'image': None,
            'featured': True,
            'order': 3,
            'gradient': 'from-green-500/20 to-teal-500/20',
            'accent_color': 'green',
        },
    )


def remove_android_calculator_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Android Calculator App',
        category='android',
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0006_update_cricket_project_github_url'),
    ]

    operations = [
        migrations.RunPython(add_android_calculator_project, remove_android_calculator_project),
    ]