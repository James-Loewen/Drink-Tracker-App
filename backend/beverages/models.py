from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.indexes import GistIndex


class Category(models.Model):
    category = models.CharField("Beverage Category", max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.category


class Brand(models.Model):
    name = models.CharField("Brand name", max_length=150, unique=True)

    class Meta:
        indexes = [
            GistIndex(
                fields=["name"],
                name="brand_name_index",
                opclasses=["gist_trgm_ops"],
            )
        ]

    def __str__(self):
        return self.name


class Beverage(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    name = models.CharField("Beverage name", max_length=150)
    abv = models.FloatField(
        validators=[
            MinValueValidator(0.0, "Non-alcoholic beers are allowed."),
            MaxValueValidator(
                99,
                "ABV cannot be higher than 99%, although realistically, it shouldn't be higher than ~20%.",
            ),
        ]
    )

    class Meta:
        unique_together = ["brand", "name"]
        indexes = [
            GistIndex(
                fields=["name"],
                name="beverage_name_index",
                opclasses=["gist_trgm_ops"],
            )
        ]

    def __str__(self):
        return self.name