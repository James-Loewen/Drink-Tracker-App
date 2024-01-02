from django.urls import path

from . import views

urlpatterns = [
    path("", views.beverage_list_create, name="beverage-list-create"),
    path("categories/", views.category_list, name="category-list"),
    path("brands/", views.brand_list_create, name="brand-list-create"),
]
