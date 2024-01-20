from django.db.models import Q
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import logout as django_logout, login as django_login
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

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


# TODO: add /register endpoint
# class RegisterIn(Schema):
#     pass
# @router.post("/register", response=RegisterOut)
# def user_register(request, data: RegisterIn):
#     pass


@router.get("/user", response=UserDetailSchema)
def user_detail(request):
    return request.user


@router.put("/user", response=UserDetailSchema)
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


@router.post("/login", auth=None)
def user_login(request, data: LogInSchema):
    username_or_email = data.username_or_email
    password = data.password
    try:
        user = User.objects.get(
            Q(email=username_or_email.lower()) | Q(username=username_or_email.lower())
        )
        if user.check_password(password):
            django_login(request, user)
            return {"message": "Successfully logged in.", "success": True}
    except User.DoesNotExist:
        User().set_password(password)

    return {"message": "You fuckin' suck.", "success": False}


@router.post("/logout")
def user_logout(request):
    res = django_logout(request)
    print(res)
    return {"message": "Successfully logged out.", "success": True}