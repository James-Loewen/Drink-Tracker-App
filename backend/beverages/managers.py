from django.db import models
from django.db.models import Q, Value
from django.contrib.postgres.search import TrigramSimilarity, TrigramWordSimilarity


class BeverageManager(models.Manager):
    def trigram_search(
        self, q: str, name_threshold: float = 0.3, brand_threshold: float = 0.4
    ):
        """
        Perform trigram searches on the "name" and "brand__name" fields of Beverage objects.

        Args:
            q (str): The search query
            name_threshold (float): Threshold for trigram similarity on the "name" field.
            brand_name_threshold (float): Threshold for trigram similarity on the "brand__name" field.

        Returns:
            QuerySet: A filtered queryest of Beverage objects based on trigram search.
        """
        return (
            self.get_queryset()
            .annotate(
                name_sim=TrigramSimilarity("name", q),
                brand_name_sim=TrigramWordSimilarity(Value(q), "brand__name"),
            )
            .filter(
                Q(name_sim__gte=name_threshold) | Q(brand_name_sim__gte=brand_threshold)
            )
            .order_by("-name_sim", "-brand_name_sim")
        )


class BrandManager(models.Manager):
    def trigram_search(self, q: str, threshold: float = 0.4):
        return (
            self.get_queryset()
            .annotate(
                name_sim=TrigramWordSimilarity(Value(q), "name"),
            )
            .filter(name_sim__gte=threshold)
            .order_by("-name_sim")
        )
