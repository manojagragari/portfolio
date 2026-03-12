from django.db import migrations


def add_tesla_dashboard_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.update_or_create(
        title='Tesla Global Performance & Sustainability Dashboard',
        category='data_science',
        defaults={
            'description': 'A 7-page interactive Power BI dashboard that analyzes Tesla performance, production trends, regional growth, and sustainability impact with app-style navigation.',
            'long_description': 'This project is a 7-page interactive Power BI report designed like an app experience with smooth navigation across analytical views. It covers yearly trend analysis, regional performance, model-wise behavior, production-focused insights, CO2 savings analytics, and a final leadership dashboard for KPI-driven decision-making. The report combines DAX-powered metrics, contextual slicers, and consistent visual storytelling for business insight and usability.',
            'features': [
                'Home & navigation hub with button-based page transitions',
                'Year-wise analysis of deliveries, production, pricing, battery capacity, EV range, and CO2 savings',
                'Region-wise performance comparison using geographic and trend visuals',
                'Model-wise breakdown of deliveries, production, pricing, battery, range, and charging metrics',
                'Production-focused analysis of yearly output and capacity trends',
                'CO2 saved analytics for sustainability and emission reduction impact',
                'Final integrated leadership dashboard with key KPI overview',
            ],
            'tech_stack': [
                'Power BI',
                'DAX',
                'Data Visualization',
                'Data Analytics',
            ],
            'github_url': 'https://github.com/your-username/tesla-global-performance-dashboard',
            'apk_url': None,
            'live_url': None,
            'image': None,
            'featured': True,
            'order': 2,
            'gradient': 'from-orange-500/20 to-yellow-500/20',
            'accent_color': 'blue',
        },
    )


def remove_tesla_dashboard_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Tesla Global Performance & Sustainability Dashboard',
        category='data_science',
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0007_add_android_calculator_project'),
    ]

    operations = [
        migrations.RunPython(add_tesla_dashboard_project, remove_tesla_dashboard_project),
    ]
