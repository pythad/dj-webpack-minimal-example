from django.urls import path, include


urlpatterns = [
    path('books/', include(('books.api_urls', 'books'), namespace='books')),
]
