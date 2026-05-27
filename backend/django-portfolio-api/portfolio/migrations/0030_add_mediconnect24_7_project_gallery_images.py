from django.db import migrations


def add_mediconnect24_7_gallery_images(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    ProjectGalleryImage = apps.get_model('portfolio', 'ProjectGalleryImage')

    project = Project.objects.filter(title='MediConnect24-7', category='android').first()
    if project is None:
        return

    screenshot_paths = [
        'projects/gallery/support-01.jpg',
        'projects/gallery/support-02.jpg',
        'projects/gallery/support-03.jpg',
        'projects/gallery/support-04.jpg',
        'projects/gallery/support-05.jpg',
        'projects/gallery/support-06.jpg',
        'projects/gallery/support-07.jpg',
        'projects/gallery/support-08.jpg',
        'projects/gallery/support-09.jpg',
    ]

    for order, image_path in enumerate(screenshot_paths, start=1):
        ProjectGalleryImage.objects.update_or_create(
            project=project,
            order=order,
            defaults={
                'image': image_path,
                'caption': f'MediConnect24-7 screenshot {order}',
            },
        )


def remove_mediconnect24_7_gallery_images(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    ProjectGalleryImage = apps.get_model('portfolio', 'ProjectGalleryImage')

    project = Project.objects.filter(title='MediConnect24-7', category='android').first()
    if project is None:
        return

    ProjectGalleryImage.objects.filter(project=project, order__in=range(1, 10)).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0029_add_mediconnect24_7_project'),
    ]

    operations = [
        migrations.RunPython(
            add_mediconnect24_7_gallery_images,
            remove_mediconnect24_7_gallery_images,
        ),
    ]