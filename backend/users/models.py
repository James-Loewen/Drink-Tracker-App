from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager


class User(AbstractUser):
    """
    Custom User class implementing a fully featured User model with
    admin-compliant permissions.

    Username, password, and email are required. Other fields are optional.
    Display username field is used to preserve the original case of the
    chosen username. Using this separate field duplicates data to an extent,
    but the goal is to prevent costly `username__iexact` lookups.

    Full name is used instead of individual first and last name fields.
    Display name is an optional nick/preferred-name field.
    """

    display_username = models.CharField(
        "display username",
        help_text="Don't edit directly",
        max_length=150,
        blank=True,
    )

    full_name = models.CharField("full name", max_length=255, blank=True)
    display_name = models.CharField(
        "display name", max_length=255, blank=True, null=True
    )
    first_name = None  # <- Ignore/remove this field
    last_name = None  # <- Ignore/remove this field

    email = models.EmailField("email address", unique=True, blank=True)

    objects = UserManager()

    def get_full_name(self):
        """
        Return the full_name field.
        """
        return self.full_name.strip()

    def get_short_name(self):
        """Return the display name for the user if exists else username"""
        if self.display_name:
            return self.display_name
        return self.display_username

    def save(self, *args, **kwargs):
        if not self.pk:  # i.e., "User was just created"
            self.display_username = self.username

        self.username = self.username.lower()
        self.email = self.email.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        if self.display_name:
            return self.display_name
        return self.display_username
