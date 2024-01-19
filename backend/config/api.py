from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

from ninja import NinjaAPI
from ninja.security import django_auth

from beverages.api import router as beverages_router

api = NinjaAPI(auth=django_auth, csrf=True)

api.add_router("/beverages/", beverages_router, tags=["Beverage endpoints"])
api.add_router("/auth/", "users.api.router", tags=["Auth endpoints"])
api.add_router("/drink-log/", "drink_log.api.router", tags=["Drink Log endpoints"])


@api.get("/csrf", auth=None, tags=["Csrf"])
@ensure_csrf_cookie
@csrf_exempt
def csrf(request):
    """
    This route returns an HttpResponse that sets a csrf cookie
    """
    return HttpResponse()
