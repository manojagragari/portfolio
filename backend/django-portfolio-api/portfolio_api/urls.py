from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.decorators.cache import cache_control
from django.views.static import serve


def health_check(request):
    return JsonResponse({'status': 'ok', 'api': '/api/'})


# Media should not be cached aggressively; stale 404s can hide recent uploads.
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
def serve_media(request, path):
    """Serve media files without stale caching."""
    return serve(request, path, document_root=settings.MEDIA_ROOT)


urlpatterns = [
    path('', health_check, name='health-check'),
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # Production media route.
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve_media),
    ]
