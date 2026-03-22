import os
from django.core.wsgi import get_wsgi_application
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_api.settings')

# Ensure media directory exists at runtime (persistent disk available)
media_root = os.environ.get('MEDIA_ROOT', 'media')
Path(media_root).mkdir(parents=True, exist_ok=True)

application = get_wsgi_application()
