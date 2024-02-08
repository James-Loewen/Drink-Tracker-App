from .base import *

DEBUG = True

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    }
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
