from django.db import migrations


def update_5star_python_achievement_media(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')

    supportive_images = [
        '/media/achievements/docs/five-star-python-support-01.jpeg',
    ]

    achievement = Achievement.objects.filter(title='5 Star Python').first()

    if achievement is None:
        achievement = Achievement.objects.create(
            title='5 Star Python',
            platform='HackerRank',
            description='Achieved 5 Star rating in Python on HackerRank by solving 50+ Python challenges across core programming, data structures, and algorithms.',
            year=2026,
            icon='⭐',
            color='cyan',
            gradient='from-cyan-500/10 to-transparent',
            border_color='border-cyan-500/30',
            text_color='text-cyan-400',
            cover_image='achievements/covers/five-star-python-cover.jpg',
            supportive_images=supportive_images,
        )
        return

    achievement.cover_image = 'achievements/covers/five-star-python-cover.jpg'
    achievement.supportive_images = supportive_images
    achievement.save(update_fields=['cover_image', 'supportive_images'])


def rollback_5star_python_achievement_media(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')
    achievement = Achievement.objects.filter(title='5 Star Python').first()
    if achievement is None:
        return
    achievement.supportive_images = []
    achievement.save(update_fields=['supportive_images'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0027_update_top5_hackathon_achievement_media'),
    ]

    operations = [
        migrations.RunPython(
            update_5star_python_achievement_media,
            rollback_5star_python_achievement_media,
        ),
    ]
