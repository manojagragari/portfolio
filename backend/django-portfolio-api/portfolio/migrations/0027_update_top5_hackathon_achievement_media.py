from django.db import migrations


def update_top5_hackathon_achievement_media(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')

    supportive_images = [
        '/media/achievements/docs/top-5-hackathon-support-01.jpeg',
    ]

    achievement = Achievement.objects.filter(title__icontains='Top 5').first()

    if achievement is None:
        achievement = Achievement.objects.create(
            title='Top 5 – University Hackathon',
            platform='Coding Ninjas',
            description='Secured Top 5 position among 100+ teams at the University-level Hackathon (Coding Ninjas), building an innovative solution under 24 hours.',
            year=2023,
            icon='🏆',
            color='purple',
            gradient='from-purple-500/10 to-transparent',
            border_color='border-purple-500/30',
            text_color='text-purple-400',
            cover_image='achievements/covers/top-5-hackathon-cover.jpg',
            supportive_images=supportive_images,
        )
        return

    achievement.cover_image = 'achievements/covers/top-5-hackathon-cover.jpg'
    achievement.supportive_images = supportive_images
    achievement.save(update_fields=['cover_image', 'supportive_images'])


def rollback_top5_hackathon_achievement_media(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')
    achievement = Achievement.objects.filter(title__icontains='Top 5').first()
    if achievement is None:
        return
    achievement.supportive_images = []
    achievement.save(update_fields=['supportive_images'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0026_add_achievement_supportive_images_and_update_working_prototype'),
    ]

    operations = [
        migrations.RunPython(
            update_top5_hackathon_achievement_media,
            rollback_top5_hackathon_achievement_media,
        ),
    ]
