from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Category, Brand, Beverage


User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]

    def validate_name(self, name):
        if Brand.objects.filter(name__iexact=name).exists():
            raise serializers.ValidationError("Brand already exists.")
        else:
            return name


class BeverageSerializer(serializers.ModelSerializer):
    # Read only
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)

    # Write only
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(), source="brand", write_only=True
    )

    class Meta:
        model = Beverage
        fields = [
            "id",
            "name",
            "abv",
            "category",
            "brand",
            "category_id",
            "brand_id",
        ]
