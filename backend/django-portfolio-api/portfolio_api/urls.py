from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.decorators.cache import cache_control
from django.views.static import serve


def health_check(request):
    return JsonResponse({'status': 'ok', 'api': '/api/'})


# Cache-aware media serving for fresh uploads
@cache_control(max_age=3600, public=True)
def serve_media(request, path):
    """Serve media files with proper cache headers."""
    return serve(request, path, document_root=settings.MEDIA_ROOT)


urlpatterns = [
    path('', health_check, name='health-check'),
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # Production: serve media with cache headers to ensure fresh uploads are served
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve_media),
    ]
