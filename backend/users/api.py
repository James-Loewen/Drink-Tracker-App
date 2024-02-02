from typing import TypeVar, Optional

from pydantic import BaseModel
from pydantic.generics import GenericModel

from django.db.models import Q
from django.http import HttpResponse
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth import logout as django_logout, login as django_login
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import ensure_csrf_cookie

from ninja import Router, Schema, ModelSchema

User = get_user_model()

router = Router()


class LogInSchema(Schema):
    username_or_email: str
    password: str


class UserUpdateSchema(ModelSchema):
    class Meta:
        model = User
        fields = [
            "username",
            "full_name",
            "display_name",
            "email",
        ]


class UserDetailSchema(ModelSchema):
    class Meta:
        model = User
        fields = [
            "display_name",
            "display_username",
            "email",
            "full_name",
        ]


class MessageSchema(Schema):
    success: bool
    message: str = None
    errors: dict[str, list[str]] = None
    data: UserDetailSchema = None


class UserRegisterSchema(Schema):
    username: str
    email: str
    full_name: str = ""
    display_name: str = ""
    password1: str
    password2: str


# TODO: add /register endpoint
# class RegisterIn(Schema):
#     pass
# @router.post("/register", response=RegisterOut)
# def user_register(request, data: RegisterIn):
#     pass


@router.get("csrf/")
@ensure_csrf_cookie
def get_csrf_token(request):
    """
    # Returns a valid csrf token
    """
    return HttpResponse()


@router.get("user/", response=UserDetailSchema)
def user_detail(request):
    print("Using the Django Ninja user-detail endpoint")
    return request.user


@router.put("user/", response=UserDetailSchema)
def update_user(request, data: UserUpdateSchema):
    user = request.user
    data_dict = data.dict(exclude_unset=True)

    preserve_username_case = data_dict.get("username", None)
    if preserve_username_case is not None:
        data_dict["display_username"] = preserve_username_case

    for attr, value in data_dict.items():
        setattr(user, attr, value)

    user.save()
    return user


@router.post("login", response={200: MessageSchema, 400: MessageSchema}, auth=None)
def user_login(request, data: LogInSchema):
    username_or_email = data.username_or_email
    password = data.password
    try:
        user = User.objects.get(
            Q(email=username_or_email.lower()) | Q(username=username_or_email.lower())
        )
        if user.check_password(password):
            django_login(request, user)
            return 200, {"success": True, "message": "Successfully logged in."}
    except User.DoesNotExist:
        User().set_password(password)

    return 400, {
        "success": False,
        "errors": {"general": ["Incorrect or invalid credentials"]},
    }


@router.post("logout")
def user_logout(request):
    django_logout(request)
    return {"message": "Successfully logged out.", "success": True}


@router.post(
    "register",
    response={201: MessageSchema, 400: MessageSchema},
    auth=None,
)
def user_register(request, data: UserRegisterSchema):
    # Check that passwords match
    if data.password1 != data.password2:
        return 400, {
            "success": False,
            "errors": {"password": ["Passwords did not match."]},
        }

    # Validate password
    try:
        password_validation.validate_password(data.password1)
    except ValidationError as e:
        return 400, {"success": False, "errors": {"password": e.messages}}

    # Check for existing users
    if User.objects.filter(
        Q(username=data.username.lower()) | Q(email=data.email.lower())
    ).exists():
        return 400, {
            "success": False,
            "errors": {"username": ["Username or email already taken."]},
        }

    # Create User
    user_data = data.dict()
    user_data.pop("password2")
    password = user_data.pop("password1")
    user = User.objects.create(**user_data)
    user.set_password(password)
    user.save()
    return 201, {"success": True, "message": "User created.", "data": user}
