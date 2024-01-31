from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import (
    get_user_model,
    login as django_login,
    logout as django_logout,
)

from rest_framework import permissions, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveUpdateAPIView

from .serializers import LoginSerializer, RegisterSerializer, UserDetailsSerializer

ensure_csrf_cookie_method = method_decorator(ensure_csrf_cookie)
csrf_protected_method = method_decorator(csrf_protect)

User = get_user_model()


class LoginView(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def _authenticate_by_username_or_email(self, username_or_email, password):
        try:
            user = User.objects.get(
                Q(email=username_or_email.lower())
                | Q(username=username_or_email.lower())
            )
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexisting user.
            User().set_password(password)

        return None

    def get_auth_user(self, username_or_email, password):
        user = self._authenticate_by_username_or_email(username_or_email, password)
        return user

    @csrf_protected_method
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username_or_email = serializer.validated_data.get("username_or_email")
        password = serializer.validated_data.get("password")
        user = self.get_auth_user(username_or_email, password)

        if user is not None:
            django_login(request, user)
            return Response(
                {"success": True, "message": "Successfully logged in."},
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": "Invalid credentials",
            },
            status=status.HTTP_200_OK,
        )


login_view = LoginView.as_view()


class LogoutView(APIView):
    """Calls Django's builtin logout function"""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        django_logout(request)

        return Response(
            {"success": True, "message": "Successfully logged out."},
            status=status.HTTP_200_OK,
        )


logout_view = LogoutView.as_view()


class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def validate_username_email_uniqueness(self, username, email):
        print(
            self.queryset.filter(Q(username=username.lower()) | Q(email=email.lower()))
        )
        if self.queryset.filter(
            Q(username=username.lower()) | Q(email=email.lower())
        ).exists():
            raise serializers.ValidationError(
                {"non_field_errors": ["Username or email already taken."]}
            )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        email = serializer.validated_data["email"]
        self.validate_username_email_uniqueness(username, email)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {"Location": str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


register_user_view = RegisterUserView.as_view()


class UserDetailView(RetrieveUpdateAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]

    @ensure_csrf_cookie_method
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_object(self):
        print("Using the DRF user-detail endpoint")
        return self.request.user

    def get_queryset(self):
        return User.objects.none()


user_detail_view = UserDetailView.as_view()
