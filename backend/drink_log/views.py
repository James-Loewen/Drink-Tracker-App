from datetime import datetime

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView

from .models import DrinkLog
from .serializers import DrinkLogSerializer

DATE_FORMAT = "%Y-%m-%d"


class DrinkLogList(ListCreateAPIView):
    serializer_class = DrinkLogSerializer
    queryset = DrinkLog.objects.all().order_by("-timestamp")
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        queryset = queryset.filter(user=self.request.user)
        start_date = self.request.GET.get("startDate")
        end_date = self.request.GET.get("endDate")
        print("What the freakin ass heck", start_date, end_date)
        if start_date and end_date:
            queryset = queryset.filter(timestamp__range=(start_date, end_date))
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, user=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer, **kwargs):
        serializer.save(**kwargs)


drink_log_list = DrinkLogList.as_view()
