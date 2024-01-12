from django.contrib import admin

from .models import Category, Brand, Beverage

admin.site.register(Category)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    fieldsets = [[None, {"fields": ["name"]}], ["Meta", {"fields": ["added_by"]}]]
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(Beverage)
class BeverageAdmin(admin.ModelAdmin):
    fieldsets = [
        [None, {"fields": ["category", "brand", "name", "abv"]}],
        ["Meta", {"fields": ["added_by"]}],
    ]
    list_display = ["name", "brand", "abv"]
    search_fields = ["name", "brand__name"]
