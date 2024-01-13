from django.db import models
from django.contrib.auth import get_user_model

from .fields import DateTimeWithoutTimeZoneField
from beverages.models import Beverage

User = get_user_model()


class DrinkLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    beverage = models.ForeignKey(Beverage, on_delete=models.CASCADE)
    volume = models.DecimalField("Volume (mL)", max_digits=6, decimal_places=3)
    timestamp = DateTimeWithoutTimeZoneField()

    @property
    def volume_in_oz(self):
        oz = round(float(self.volume) / 29.5735, 1)
        if oz.is_integer():
            return f"{oz:.0f} oz"
        return f"{oz:.1f} oz"

    class Meta:
        verbose_name_plural = "Drink log"

    def __str__(self):
        return f"{self.user.display_username} {self.timestamp}"
