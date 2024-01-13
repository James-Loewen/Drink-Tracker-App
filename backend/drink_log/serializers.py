from django.contrib.auth import get_user_model
from rest_framework import serializers

from beverages.models import Beverage
from beverages.serializers import BeverageSerializer
from .models import DrinkLog


User = get_user_model()


class NaiveDateTimeField(serializers.DateTimeField):
    def default_timezone(self):
        return None


class DrinkLogSerializer(serializers.ModelSerializer):
    # Read/Write
    timestamp = NaiveDateTimeField(default_timezone=None)

    # Read Only
    beverage = BeverageSerializer(read_only=True)

    # Write Only
    beverage_id = serializers.PrimaryKeyRelatedField(
        queryset=Beverage.objects.all(), source="beverage", write_only=True
    )

    class Meta:
        model = DrinkLog
        fields = [
            "timestamp",
            "beverage",
            "volume",
            "beverage_id",
        ]
