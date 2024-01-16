from django.urls import reverse
from django.contrib import admin
from django.utils.html import format_html

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
    list_display = ["name", "link_to_brand", "abv"]
    search_fields = ["name", "brand__name"]

    def link_to_brand(self, obj):
        link = reverse("admin:beverages_brand_change", args=[obj.brand.pk])
        return format_html('<a href="{}">{}</a>', link, obj.brand.name)

    link_to_brand.short_description = "Brand"
