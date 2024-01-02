from .base import *

DEBUG = True

THIRD_PARTY_APPS += ["corsheaders"]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

# Add CORS middleware *before* django.[...].CommonMiddleware
MIDDLEWARE.insert(2, "corsheaders.middleware.CorsMiddleware")

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    }
}

EMAIL_BACKEND = "django.core.mail.backend.console.EmailBackend"
