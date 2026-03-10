# Generated migration file - Create models

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('platform', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('year', models.PositiveIntegerField()),
                ('icon', models.CharField(default='⭐', max_length=10)),
                ('color', models.CharField(default='cyan', max_length=20)),
                ('gradient', models.CharField(default='from-cyan-500/10 to-transparent', max_length=100)),
                ('border_color', models.CharField(default='border-cyan-500/30', max_length=100)),
                ('text_color', models.CharField(default='text-cyan-400', max_length=50)),
            ],
            options={
                'ordering': ['-year'],
            },
        ),
        migrations.CreateModel(
            name='Certification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('issuer', models.CharField(max_length=100)),
                ('year', models.PositiveIntegerField()),
                ('url', models.URLField(blank=True, null=True)),
                ('icon', models.CharField(default='📜', max_length=10)),
                ('color', models.CharField(default='cyan', max_length=20)),
            ],
            options={
                'ordering': ['-year'],
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100)),
                ('icon', models.CharField(default='💻', max_length=10)),
                ('color', models.CharField(choices=[('cyan', 'Cyan'), ('purple', 'Purple'), ('blue', 'Blue'), ('green', 'Green')], default='cyan', max_length=20)),
                ('items', models.JSONField(default=list)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('category', models.CharField(choices=[('web', 'Web Development'), ('android', 'Android Development'), ('data_science', 'Data Science')], max_length=20)),
                ('description', models.TextField()),
                ('long_description', models.TextField(blank=True)),
                ('features', models.JSONField(default=list)),
                ('tech_stack', models.JSONField(default=list)),
                ('github_url', models.URLField(blank=True, null=True)),
                ('live_url', models.URLField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='projects/')),
                ('featured', models.BooleanField(default=False)),
                ('order', models.PositiveIntegerField(default=0)),
                ('gradient', models.CharField(default='from-cyan-500/20 to-blue-500/20', max_length=100)),
                ('accent_color', models.CharField(default='cyan', max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['order', '-created_at'],
            },
        ),
    ]
