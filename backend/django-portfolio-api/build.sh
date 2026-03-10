#!/bin/bash
# Build script for Render.com

set -e  # Exit on error

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Load initial data
python manage.py loaddata portfolio/fixtures/initial_data.json

# Collect static files
python manage.py collectstatic --no-input
