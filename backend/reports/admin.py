# # Register your models here.
# admin.site.register(UserReport)
# admin.site.register(UserReportStatus)

from django.urls import reverse
from django.contrib import admin
from django.utils.html import format_html

from .models import UserReport, UserReportStatus


admin.site.register(UserReportStatus)


@admin.register(UserReport)
class UserReportAdmin(admin.ModelAdmin):
    def is_resolved(self):
        return self.status.status == "complete"

    is_resolved.boolean = True
    is_resolved.short_description = "resolved"

    list_display = [
        "reason",
        "user",
        "status",
        is_resolved,
    ]
    # search_fields = ["user__display_username", "beverage__name"]
    ordering = ["status", "-updated_at"]  # Order from most to least recent
    list_filter = ["status", "reason"]

    # def link_to_beverage(self, obj):
    #     link = reverse("admin:beverages_beverage_change", args=[obj.beverage.pk])
    #     return format_html('<a href="{}">{}</a>', link, obj.beverage.name)

    # link_to_beverage.short_description = "Beverage"
