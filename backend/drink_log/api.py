from typing import List

from ninja import Router, Schema, ModelSchema

from beverages.api import BeverageOut
from .models import DrinkLog


router = Router()


class DrinkLogIn(Schema):
    timestamp: str
    volume: float | str
    beverage_id: int


class DrinkLogOut(ModelSchema):
    beverage: BeverageOut

    class Meta:
        model = DrinkLog
        fields = [
            "id",
            "timestamp",
            "volume",
            "beverage",
        ]


@router.get("", response=List[DrinkLogOut])
def list_drink_log(request, startDate: str = "", endDate: str = ""):
    queryset = DrinkLog.objects.filter(user=request.user).order_by("-timestamp")
    if startDate and endDate:
        queryset = queryset.filter(timestamp__range=(startDate, endDate))
    return queryset


@router.post("", response={201: DrinkLogOut, 400: str})
def post_drink_log(request, data: DrinkLogIn):
    try:
        log = DrinkLog.objects.create(user=request.user, **data.dict())
    except Exception as e:
        print(e)
        return 400, "you ought not to have done that..."
    return 201, log


# DATE_FORMAT = "%Y-%m-%d"


# class DrinkLogList(ListCreateAPIView):
#     serializer_class = DrinkLogSerializer
#     queryset = DrinkLog.objects.all().order_by("-timestamp")
#     permission_classes = [permissions.IsAuthenticated]
#     pagination_class = None

#     def filter_queryset(self, queryset):
#         queryset = super().filter_queryset(queryset)
#         queryset = queryset.filter(user=self.request.user)
#         start_date = self.request.GET.get("startDate")
#         end_date = self.request.GET.get("endDate")
#         if start_date and end_date:
#             queryset = queryset.filter(timestamp__range=(start_date, end_date))
#         return queryset

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer, user=request.user)
#         headers = self.get_success_headers(serializer.data)
#         return Response(
#             serializer.data, status=status.HTTP_201_CREATED, headers=headers
#         )

#     def perform_create(self, serializer, **kwargs):
#         serializer.save(**kwargs)
