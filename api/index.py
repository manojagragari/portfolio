import sys
import os
from pathlib import Path

# Add backend to path so Django can be imported
backend_path = Path(__file__).parent.parent / 'backend' / 'django-portfolio-api'
sys.path.insert(0, str(backend_path))

# Set Django settings module before importing Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_api.settings')

import django
django.setup()

# Import and export the WSGI application
from portfolio_api.wsgi import application

__all__ = ['application']

