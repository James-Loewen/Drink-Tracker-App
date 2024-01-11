from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


class CamelCaseMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {self.to_camel_case(k): v for k, v in data.items()}

    def to_internal_value(self, data):
        return {self.to_snake_case(k): v for k, v in data.items()}

    def to_camel_case(self, snake_str):
        components = snake_str.split("_")
        return components[0] + "".join(s.title() for s in components[1:])

    def to_snake_case(self, camel_str):
        return "".join(
            ["_" + s.lower() if s.isupper() else s for s in camel_str]
        ).lstrip("_")


class LoginSerializer(CamelCaseMixin, serializers.Serializer):
    username_or_email = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(
        style={"input_type": "password", "placeholder": "password"},
    )


class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255, required=True)
    display_name = serializers.CharField(max_length=255, required=False)
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(
        write_only=True,
        style={"input_type": "password", "placeholder": "password"},
    )
    password2 = serializers.CharField(
        write_only=True,
        style={"input_type": "password", "placeholder": "password (again)"},
    )

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords didn't match.")
        return data

    def get_cleaned_data(self):
        return {
            "full_name": self.validated_data.get("full_name", ""),
            "display_name": self.validated_data.get("display_name", ""),
            "username": self.validated_data.get("username", ""),
            "email": self.validated_data.get("email", ""),
            "password": self.validated_data.get("password1", ""),
        }

    def save(self):
        self.cleaned_data = self.get_cleaned_data()
        password = self.cleaned_data.pop("password")
        user = User(**self.cleaned_data)
        user.set_password(password)
        user.save()
        return user


class UserDetailsSerializer(CamelCaseMixin, serializers.ModelSerializer):
    """User model without password"""

    username = serializers.CharField(write_only=True, required=False)

    def update(self, instance, validated_data):
        preserve_case_username = validated_data.get("username")
        if preserve_case_username:
            validated_data["display_username"] = preserve_case_username

        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = [
            "full_name",
            "display_name",
            "username",
            "display_username",
            "email",
        ]
        read_only_fields = ["display_username", "email"]
