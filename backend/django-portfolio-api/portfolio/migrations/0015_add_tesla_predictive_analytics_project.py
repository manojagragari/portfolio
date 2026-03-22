# Generated migration to add Tesla Predictive Analytics project

from django.db import migrations


def add_tesla_predictive_analytics_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.get_or_create(
        title='Tesla Vehicle Deliveries – Predictive Analytics & Machine Learning Dashboard',
        category='data_science',
        defaults={
            'description': 'An end-to-end predictive analytics and machine learning project analyzing Tesla delivery data (2015–2025) with regression models, classification algorithms, unsupervised learning techniques, and an interactive Streamlit dashboard for real-time predictions.',
            'long_description': 'This comprehensive machine learning project applies the complete data science pipeline to real-world Tesla vehicle delivery data. It covers data preprocessing, exploratory analysis, feature engineering, and develops multiple predictive models including Linear Regression, Random Forest, neural networks (MLP), and classification models for delivery performance segmentation. The project implements unsupervised learning techniques such as K-Means clustering and PCA to identify hidden patterns in delivery trends. All models are evaluated using industry-standard metrics (R² score, RMSE, accuracy, cross-validation) and deployed through a multi-page interactive Streamlit dashboard enabling live predictions and visualization of historical trends.',
            'features': [
                'Data preprocessing and feature engineering on historical Tesla delivery data (2015–2025)',
                'Regression analysis using Linear Regression and Random Forest models',
                'Classification models to categorize delivery performance into high and low segments',
                'Unsupervised learning with K-Means clustering and PCA dimensionality reduction',
                'Neural Network (MLP) implementation to capture non-linear relationships',
                'Comprehensive model evaluation using R² score, RMSE, accuracy, and cross-validation',
                'Multi-page interactive Streamlit dashboard for visualization',
                'Live prediction capabilities for future vehicle deliveries',
                'Time-series trend analysis and pattern recognition'
            ],
            'tech_stack': ['Python', 'scikit-learn', 'TensorFlow', 'Keras', 'Streamlit', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
            'github_url': 'https://github.com/manojagragari/predictive-analysis-project-streamlit-code',
            'featured': True,
            'order': 1,
            'gradient': 'from-emerald-500/20 to-teal-500/20',
            'accent_color': 'emerald'
        }
    )


def remove_tesla_predictive_analytics_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Tesla Vehicle Deliveries – Predictive Analytics & Machine Learning Dashboard',
        category='data_science'
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0014_add_job_portal_project'),
    ]

    operations = [
        migrations.RunPython(add_tesla_predictive_analytics_project, remove_tesla_predictive_analytics_project),
    ]
