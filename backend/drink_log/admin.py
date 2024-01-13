from django.contrib import admin

from .models import DrinkLog


@admin.register(DrinkLog)
class DrinkLogAdmin(admin.ModelAdmin):
    list_display = ["user", "beverage", "volume_in_oz", "timestamp"]
    search_fields = ["user__display_username", "beverage__name"]
    ordering = ["-timestamp"]  # Order from most to least recent
