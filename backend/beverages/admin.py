from django.contrib import admin

from .models import Category, Brand, Beverage

admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Beverage)
