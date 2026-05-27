from django.db import migrations


def add_mediconnect24_7_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.update_or_create(
        title='MediConnect24-7',
        category='android',
        defaults={
            'description': 'A full-featured Android healthcare app for booking appointments, managing records, and connecting patients with doctors anytime.',
            'long_description': 'MediConnect24-7 is a full-featured Android application that bridges patients and healthcare providers with 24/7 access to appointments, medical records, and consultation flows. Built with Android Studio and Firebase, it focuses on user-centric healthcare accessibility, secure authentication, and practical mobile workflows for both patients and doctors.',
            'features': [
                'Secure sign up and login for patients and doctors with Firebase/Google Auth',
                'Appointment booking with specialty search, slot view, and cancellation',
                'In-app chat and video consultations for live healthcare support',
                'Digital health records for prescriptions, lab results, and visit history',
                'Push notifications for appointments and medication reminders',
                'Emergency access with quick-dial support for hospitals and contacts',
                'Personalized dashboards for doctors and patients',
            ],
            'tech_stack': [
                'Kotlin',
                'Android Studio',
                'Firebase Auth',
                'Firestore',
                'Cloud Messaging',
                'Material Components',
                'WebRTC / Jitsi / Agora',
            ],
            'github_url': 'https://github.com/manojagragari/mediconnect24-7',
            'apk_url': '/projects/mediconnect24-7.apk',
            'live_url': None,
            'image': None,
            'featured': True,
            'order': 5,
            'gradient': 'from-green-500/20 to-teal-500/20',
            'accent_color': 'green',
        },
    )


def remove_mediconnect24_7_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(title='MediConnect24-7', category='android').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0028_update_5star_python_achievement_media'),
    ]

    operations = [
        migrations.RunPython(add_mediconnect24_7_project, remove_mediconnect24_7_project),
    ]