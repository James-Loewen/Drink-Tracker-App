from django.db.models import Q, Value  # , F
from django.contrib.postgres.search import (
    # CombinedSearchVector,
    # TrigramStrictWordSimilarity,
    TrigramWordSimilarity,
    TrigramSimilarity,
)

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, ListCreateAPIView

from .models import Category, Brand, Beverage
from .serializers import (
    CategorySerializer,
    BrandSerializer,
    BeverageSerializer,
)


class CategoryList(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


category_list = CategoryList.as_view()


class BrandListCreate(ListCreateAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all().order_by("pk")

    def _trigram_search(self, q, threshold=0.4):
        return (
            Brand.objects.annotate(
                name_sim=TrigramWordSimilarity(Value(q), "name"),
            )
            .filter(name_sim__gte=threshold)
            .order_by("-name_sim")
        )

    def list(self, request, *args, **kwargs):
        q = request.GET.get("q")
        if q:
            queryset = self._trigram_search(q)
        else:
            queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, added_by=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer, **kwargs):
        return serializer.save(**kwargs)


brand_list_create = BrandListCreate.as_view()


class BeverageListCreate(ListCreateAPIView):
    queryset = Beverage.objects.all().order_by("name")
    serializer_class = BeverageSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def _trigram_search(self, q, name_threshold=0.3, brand_threshold=0.4):
    #     """
    #     Perform trigram searches on the "name" and "brand__name" fields of Beverage objects.

    #     Args:
    #         q (str): The search query
    #         name_threshold (float): Threshold for trigram similarity on the "name" field.
    #         brand_name_threshold (float): Threshold for trigram similarity on the "brand__name" field.

    #     Returns:
    #         QuerySet: A filtered queryest of Beverage objects based on trigram search.
    #     """
    #     return (
    #         Beverage.objects.annotate(
    #             name_sim=TrigramSimilarity("name", q),
    #             brand_name_sim=TrigramWordSimilarity(Value(q), "brand__name"),
    #         )
    #         .filter(
    #             Q(name_sim__gte=name_threshold) | Q(brand_name_sim__gte=brand_threshold)
    #         )
    #         .order_by("-name_sim", "-brand_name_sim")
    #     )

    # def _vector_search(self, q):
    #     combined_search_vector = CombinedSearchVector(
    #         F("search_vector"),
    #         "||",
    #         F("brand__search_vector"),
    #         None,
    #     )
    #     return (
    #         self.get_queryset().annotate(search=combined_search_vector).filter(search=q)
    #     )

    def list(self, request, *args, **kwargs):
        q = request.GET.get("q")

        if q:
            # queryset = self._vector_search(q)
            # queryset = self._trigram_search(q)
            queryset = Beverage.objects.trigram_search(q)
        else:
            queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, added_by=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer, **kwargs):
        return serializer.save(**kwargs)


beverage_list_create = BeverageListCreate.as_view()
