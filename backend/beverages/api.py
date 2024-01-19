from typing import List
from ninja import Router, Schema, ModelSchema
from ninja.pagination import paginate

from .models import Beverage, Brand, Category

router = Router()


class Message(Schema):
    message: str


class CategoryOut(ModelSchema):
    class Meta:
        model = Category
        fields = "__all__"


class BrandOut(ModelSchema):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class BeverageOut(Schema):
    id: int
    name: str
    abv: float
    brand: BrandOut
    category: CategoryOut


@router.get("", response=List[BeverageOut])
@paginate(page_size=50)
def list_beverages(request, q: str = ""):
    queryset = Beverage.objects.all()

    if q:
        queryset = Beverage.objects.trigram_search(q)

    return queryset
