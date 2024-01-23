from typing import List

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
