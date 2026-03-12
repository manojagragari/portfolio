from django.db import migrations


def add_cricket_android_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.update_or_create(
        title='Cricket Live & News Analytics App',
        category='android',
        defaults={
            'description': 'An Android app that delivers live cricket news, ICC team rankings, match history, and player performance insights through a dynamic interactive UI.',
            'long_description': 'The Cricket Live & News Analytics App is an Android application built to combine real-time cricket news with match-focused analytics. It integrates a News API to surface the latest cricket updates, presents the Top 10 ICC Cricket Teams (2026), and lets users open individual team cards to explore match history, player statistics, and performance trends in an interactive Jetpack Compose interface.',
            'features': [
                'Latest cricket news using API integration',
                'Top 10 ICC Teams list (2026)',
                'Clickable team cards to view match history',
                'Player statistics and performance analytics',
                'Match insights including total matches played, wins, and losses',
                'Dynamic UI with interactive components',
            ],
            'tech_stack': [
                'Kotlin',
                'Android Studio',
                'Jetpack Compose',
                'REST API Integration',
                'JSON Data Handling',
            ],
            'github_url': 'https://github.com/manojagragari/Endterm1',
            'live_url': None,
            'image': None,
            'featured': True,
            'order': 2,
            'gradient': 'from-green-500/20 to-teal-500/20',
            'accent_color': 'green',
        },
    )


def remove_cricket_android_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Cricket Live & News Analytics App',
        category='android',
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_education_contactmethod'),
    ]

    operations = [
        migrations.RunPython(add_cricket_android_project, remove_cricket_android_project),
    ]