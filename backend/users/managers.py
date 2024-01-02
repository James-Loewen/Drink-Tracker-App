from django.contrib.auth.models import UserManager as BaseUserManager


class UserManager(BaseUserManager):
    """Custom manager for case-insensitive username lookup."""

    def get_by_natural_key(self, username: str | None):
        return self.get(**{self.model.USERNAME_FIELD: username.lower()})
