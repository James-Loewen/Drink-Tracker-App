from django.db.models import Value, Q
from django.contrib.postgres.search import TrigramSimilarity, TrigramWordSimilarity

from .models import Beverage


def trigram_search(q: str, name_threshold=0.3, brand_threshold=0.4):
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
        Beverage.objects.annotate(
            name_sim=TrigramSimilarity("name", q),
            brand_name_sim=TrigramWordSimilarity(Value(q), "brand__name"),
        )
        .filter(
            Q(name_sim__gte=name_threshold) | Q(brand_name_sim__gte=brand_threshold)
        )
        .order_by("-name_sim", "-brand_name_sim")
    )
