#!/bin/bash
# Build script for Render.com

set -e  # Exit on error

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Run migrations
python manage.py migrate --noinput

# Load initial data only when explicitly enabled and database is empty.
python manage.py shell <<'PY'
import os
from portfolio.models import Project
from django.core.management import call_command

load_fixtures = os.environ.get('LOAD_INITIAL_FIXTURES', 'False').lower() == 'true'

if not load_fixtures:
	print('Fixture skipped: LOAD_INITIAL_FIXTURES is disabled')
elif Project.objects.count() == 0:
	call_command('loaddata', 'portfolio/fixtures/initial_data.json')
	print('Initial fixture loaded')
else:
	print('Fixture skipped: existing data found')
PY

# Create admin superuser if env vars are configured.
python manage.py shell <<'PY'
import os
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if username and email and password:
	if not User.objects.filter(username=username).exists():
		User.objects.create_superuser(username=username, email=email, password=password)
		print('Superuser created')
	else:
		print('Superuser already exists')
else:
	print('Superuser skipped: set DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_PASSWORD')
PY

# Collect static files
python manage.py collectstatic --no-input
