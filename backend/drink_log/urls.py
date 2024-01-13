from django.urls import path

from . import views

urlpatterns = [
    path("", views.drink_log_list, name="drink-log-list"),
]
