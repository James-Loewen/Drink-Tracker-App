from django.urls import path

from .views import login_view, register_user_view, user_detail_view, logout_view

urlpatterns = [
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("signup/", register_user_view, name="signup"),
    path("user/", user_detail_view, name="user-detail"),
]
