from django.urls import path

from . import api

urlpatterns = [
    path('', api.BookList.as_view(), name='list'),
]
