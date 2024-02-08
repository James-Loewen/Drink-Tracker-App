from typing import List
from datetime import date

from django.db import models
from django.db.models import Sum, Count, F, ExpressionWrapper, fields
from django.db.models.functions import Cast
from django.shortcuts import get_object_or_404

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


class CountsOut(Schema):
    date: date
    container_count: int
    ethanol_volume: float


@router.get("", response=List[DrinkLogOut])
def list_drink_log(request, startDate: str = "", endDate: str = ""):
    queryset = DrinkLog.objects.filter(user=request.user).order_by("-timestamp")
    if startDate and endDate:
        queryset = queryset.filter(timestamp__range=(startDate, endDate))
    return queryset


@router.post("", response={201: DrinkLogOut, 400: str})
def create_drink_log(request, data: DrinkLogIn):
    try:
        log = DrinkLog.objects.create(user=request.user, **data.dict())
    except Exception as e:
        print(e)
        return 400, "you ought not to have done that..."
    return 201, log


@router.put("{drink_log_id}")
def update_drink_log(request, drink_log_id: int, data: DrinkLogIn):
    log = get_object_or_404(DrinkLog, id=drink_log_id)

    if log.user == request.user:
        for attr, value in data.dict().items():
            setattr(log, attr, value)
        try:
            log.save()
            return {"message": "good job buddy!"}
        except Exception as e:
            print(e)

    return {"message": "You absolutely may not do that."}


class DeleteMessage(Schema):
    success: bool
    message: str


@router.delete("{drink_log_id}", response={204: DeleteMessage, 403: DeleteMessage})
def delete_drink_log(request, drink_log_id: int):
    log = get_object_or_404(DrinkLog, id=drink_log_id)

    if log.user == request.user:
        log.delete()
        return 204, {"success": True, "message": "Successfully deleted."}

    return 403, {"success": False, "message": "You absolutely may not do that."}


@router.get("counts/", response=List[CountsOut])
def get_daily_container_count_and_total_ethanol_volume(
    request, startDate: str, endDate: str
):
    """
    ## This is a more involved query that handles all of the formatting \
    and aggregation on the backend as opposed to the frontend.

    I think for weekly and monthly views, this query is unneccessary, but
    it might make a substantial difference if I were to implement a yearly view.

    |**Params**|**Description**|
    |---|---|
    |`startDate`|A date/datetime string in *YYYY-mm-dd*/*YYYY-mm-dd HH:MM:SS* format.|
    |`endDate`|A date/datetime string in *YYYY-mm-dd*/*YYYY-mm-dd HH:MM:SS* format.|
    """
    queryset = (
        DrinkLog.objects.filter(
            user=request.user,
            timestamp__date__range=[startDate, endDate],
        )
        .annotate(date=Cast("timestamp", fields.DateField()))
        .annotate(
            ethanol_volume=ExpressionWrapper(
                Sum(F("volume") * F("beverage__abv") / 100),
                output_field=models.FloatField(),
            )
        )
        .values("date", "ethanol_volume")
        .annotate(container_count=Count("id"))
        .order_by("-date")
    )
    return queryset
