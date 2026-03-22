import os
from django.core.wsgi import get_wsgi_application
from django.conf import settings
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_api.settings')

application = get_wsgi_application()

# Ensure media directory exists at runtime (persistent disk available)
Path(settings.MEDIA_ROOT).mkdir(parents=True, exist_ok=True)
