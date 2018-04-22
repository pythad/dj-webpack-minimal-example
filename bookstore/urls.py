from django_js_reverse.views import urls_js

from django.contrib import admin
from django.urls import path, include
from django.views.decorators.cache import cache_page


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(('bookstore.api_urls', 'bookstore'), namespace='api')),
    path('books/', include('books.urls')),
    path('jsreverse/', cache_page(3600)(urls_js), name='js_reverse'),
]
