import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0008_add_tesla_dashboard_project'),
    ]

    operations = [
        # ── Certification: cover_image + cert_image ──────────────────────────
        migrations.AddField(
            model_name='certification',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='certifications/covers/'),
        ),
        migrations.AddField(
            model_name='certification',
            name='cert_image',
            field=models.ImageField(blank=True, null=True, upload_to='certifications/docs/'),
        ),

        # ── Achievement: cover_image + reference_url ─────────────────────────
        migrations.AddField(
            model_name='achievement',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='achievements/covers/'),
        ),
        migrations.AddField(
            model_name='achievement',
            name='reference_url',
            field=models.URLField(blank=True, null=True),
        ),

        # ── ProjectGalleryImage (new model) ──────────────────────────────────
        migrations.CreateModel(
            name='ProjectGalleryImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='projects/gallery/')),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('order', models.PositiveIntegerField(default=0)),
                ('project', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='gallery_images',
                    to='portfolio.project',
                )),
            ],
            options={'ordering': ['order']},
        ),

        # ── Profile (new singleton model) ────────────────────────────────────
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Manoj Agrahari', max_length=100)),
                ('bio', models.TextField(blank=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile/')),
                ('cover_banner', models.ImageField(blank=True, null=True, upload_to='profile/banners/')),
                ('github_url', models.URLField(blank=True, null=True)),
                ('linkedin_url', models.URLField(blank=True, null=True)),
                ('instagram_url', models.URLField(blank=True, null=True)),
                ('email', models.EmailField(blank=True)),
                ('phone', models.CharField(blank=True, max_length=30)),
                ('resume_url', models.URLField(blank=True, null=True)),
            ],
        ),
    ]
