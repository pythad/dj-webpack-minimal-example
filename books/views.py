from django.shortcuts import render


def books_list(request):
    return render(request, 'books/list.html')
