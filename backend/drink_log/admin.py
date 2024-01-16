from django.urls import reverse
from django.contrib import admin
from django.utils.html import format_html

from .models import DrinkLog


@admin.register(DrinkLog)
class DrinkLogAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "link_to_beverage",
        "volume_in_oz",
        "us_standard_drinks",
        "timestamp",
    ]
    search_fields = ["user__display_username", "beverage__name"]
    ordering = ["-timestamp"]  # Order from most to least recent

    def link_to_beverage(self, obj):
        link = reverse("admin:beverages_beverage_change", args=[obj.beverage.pk])
        return format_html('<a href="{}">{}</a>', link, obj.beverage.name)

    link_to_beverage.short_description = "Beverage"
