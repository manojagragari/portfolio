from django.db import migrations, models


def update_working_prototype_achievement(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')

    supportive_images = [
        '/media/achievements/docs/working-prototype-support-01.jpeg',
        '/media/achievements/docs/working-prototype-support-02.jpeg',
    ]

    achievement = Achievement.objects.filter(title='Working Prototype in 24 Hours').first()

    if achievement is None:
        achievement = Achievement.objects.create(
            title='Working Prototype in 24 Hours',
            platform='Hackathon Sprint',
            description='Built a complete, fully functional working prototype from scratch within a 24-hour Hackathon sprint, demonstrating rapid development skills.',
            year=2023,
            icon='⚡',
            color='blue',
            gradient='from-blue-500/10 to-transparent',
            border_color='border-blue-500/30',
            text_color='text-blue-400',
            cover_image='achievements/covers/working-prototype-cover.jpeg',
            supportive_images=supportive_images,
        )
        return

    achievement.cover_image = 'achievements/covers/working-prototype-cover.jpeg'
    achievement.supportive_images = supportive_images
    achievement.save(update_fields=['cover_image', 'supportive_images'])


def rollback_working_prototype_achievement(apps, schema_editor):
    Achievement = apps.get_model('portfolio', 'Achievement')
    achievement = Achievement.objects.filter(title='Working Prototype in 24 Hours').first()
    if achievement is None:
        return
    achievement.supportive_images = []
    achievement.save(update_fields=['supportive_images'])


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0025_update_js_algorithms_certificate_to_free_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='achievement',
            name='supportive_images',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.RunPython(
            update_working_prototype_achievement,
            rollback_working_prototype_achievement,
        ),
    ]
