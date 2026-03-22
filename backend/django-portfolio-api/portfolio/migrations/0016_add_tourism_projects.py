# Generated migration to add tourism data visualization projects

from django.db import migrations


def add_tourism_projects(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    
    # Add International Tourism Data Visualization (Python)
    Project.objects.get_or_create(
        title='International Tourism Data Visualization',
        category='data_science',
        defaults={
            'description': 'A comprehensive data visualization project analyzing global tourism trends from 1995 to 2020 using Python and Tableau, revealing patterns, economic impacts, and pandemic-induced shifts in international travel.',
            'long_description': 'This academic data science project explores international tourism trends across multiple dimensions using real-world data from the World Bank and UNWTO. The analysis encompasses data cleaning, exploratory data analysis (EDA), dataset merging, and sophisticated visualization techniques to uncover global travel patterns. The project highlights economic impacts of tourism, major shifts induced by COVID-19, identifies countries with high-value tourism despite fewer visitors, and visualizes global recovery patterns across continents through line charts, bar charts, scatter plots, and spending analysis.',
            'features': [
                'Data cleaning and preprocessing of multi-year tourism datasets (1995–2020)',
                'Exploratory Data Analysis (EDA) with statistical insights',
                'Dataset merging from multiple international sources',
                'Line & bar charts for trend analysis',
                'Scatter plots for correlation exploration',
                'Spending and revenue analysis by country',
                'Pre vs post-pandemic comparison visualizations',
                'Regional breakdown of tourist share by continent',
                'Interactive Tableau dashboards for stakeholder exploration',
                'Data storytelling with actionable insights'
            ],
            'tech_stack': ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'Plotly', 'Tableau', 'Jupyter Notebook', 'Data Analysis'],
            'github_url': 'https://github.com/manojagragari/python.project1',
            'featured': True,
            'order': 2,
            'gradient': 'from-blue-500/20 to-cyan-500/20',
            'accent_color': 'blue'
        }
    )
    
    # Add Tourism Data Dashboard in Excel
    Project.objects.get_or_create(
        title='Tourism Data Dashboard in Excel',
        category='data_science',
        defaults={
            'description': 'An interactive tourism analytics dashboard built in Microsoft Excel with dynamic charts, slicers, and trend forecasting to visualize global tourism data (1995–2022) for hospitality stakeholders.',
            'long_description': 'This Excel-based project transforms complex international tourism statistics into actionable visual insights designed for the travel and hospitality industry. The dashboard features interactive PivotTables, dynamic slicers for multi-dimensional filtering, and professionally designed charts enabling stakeholders to explore tourism patterns across countries, regions, and time periods. The project includes pre- and post-COVID trend comparisons, forecasting models to predict future tourism recovery, and continental breakdown analysis with an elegant, intuitive UI following travel-friendly design principles.',
            'features': [
                'Cleaned and structured multi-year tourism data (1995–2022)',
                'PivotTables for dynamic data aggregation and analysis',
                'Interactive slicers for easy exploration by country, region, and time period',
                'Top 10 countries visualization by tourist arrivals',
                'Pre- and post-COVID tourism trend comparisons',
                'Regional breakdown of tourist share by continent',
                'Forecasting models using historical patterns for future trends',
                'Line & bar charts for trend visualization',
                'Pie charts for market share analysis',
                'Travel-themed dashboard design with intuitive UX/UI',
                'Europe regional analysis showing 75%+ share in global arrivals'
            ],
            'tech_stack': ['Microsoft Excel', 'PivotTables', 'Dynamic Charts', 'Slicers', 'Forecasting Tools', 'Trend Lines', 'Data Visualization'],
            'github_url': 'https://github.com/manojagragari',
            'featured': True,
            'order': 3,
            'gradient': 'from-amber-500/20 to-orange-500/20',
            'accent_color': 'amber'
        }
    )


def remove_tourism_projects(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title__in=[
            'International Tourism Data Visualization',
            'Tourism Data Dashboard in Excel'
        ],
        category='data_science'
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0015_add_tesla_predictive_analytics_project'),
    ]

    operations = [
        migrations.RunPython(add_tourism_projects, remove_tourism_projects),
    ]
