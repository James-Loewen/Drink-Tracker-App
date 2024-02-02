from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

User = get_user_model()


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = [
        [None, {"fields": ["username", "email", "password"]}],
        [
            "Personal info",
            {"fields": ["display_username", "display_name", "full_name"]},
        ],
        [
            "Permissions",
            {
                "fields": [
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ],
            },
        ],
        ["Important dates", {"fields": ["last_login", "date_joined"]}],
    ]
    list_display = [
        "username",
        "display_name",
        "email",
        "full_name",
        "is_superuser",
    ]
    search_fields = ["full_name"]
    ordering = ["id"]
    add_fieldsets = [
        [
            None,
            {
                "classes": ["wide"],
                "fields": ["username", "email", "password1", "password2"],
            },
        ],
    ]
