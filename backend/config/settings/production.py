from .base import *

DEBUG = False

# TODO: Set up and implement SendGrid for prod emails
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
