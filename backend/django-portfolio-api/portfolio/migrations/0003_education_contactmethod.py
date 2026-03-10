from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_hobby'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=200)),
                ('href', models.CharField(max_length=300)),
                ('icon', models.CharField(max_length=20)),
                ('color', models.CharField(default='text-cyan-400', max_length=50)),
                ('border_color', models.CharField(default='border-cyan-500/30', max_length=100)),
                ('bg', models.CharField(default='bg-cyan-500/10', max_length=100)),
                ('hover_bg', models.CharField(default='hover:bg-cyan-500/20', max_length=100)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institution', models.CharField(max_length=200)),
                ('degree', models.CharField(max_length=200)),
                ('grade', models.CharField(max_length=100)),
                ('period', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=200)),
                ('icon', models.CharField(default='🎓', max_length=10)),
                ('color', models.CharField(default='cyan', max_length=20)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]
