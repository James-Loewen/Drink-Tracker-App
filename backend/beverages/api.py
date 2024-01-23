from typing import List

from ninja import Router, Schema
from ninja.pagination import paginate

from .models import Beverage, Brand, Category

router = Router()


class Message(Schema):
    success: bool
    message: str


class CategoryOut(Schema):
    id: int
    category: str


class BrandIn(Schema):
    name: str


class BrandOut(Schema):
    id: int
    name: str


class BeverageIn(Schema):
    name: str
    abv: float
    brand_id: int
    category_id: int


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


@router.post("", response={201: BeverageOut, 400: Message})
def create_beverage(request, data: BeverageIn):
    name = data.dict().get("name")
    brand_id = data.dict().get("brand_id")
    if Beverage.objects.filter(name__iexact=name, brand_id=brand_id).exists():
        print("No duplicates please and thank you")
        return 400, {"success": False, "message": "Beverage already exists."}

    beverage = Beverage(**data.dict(), added_by=request.user)
    beverage.save()
    return 201, beverage


@router.get("brands/", response=List[BrandOut])
@paginate(page_size=50)
def list_brands(request, q: str = ""):
    queryset = Brand.objects.all()

    if q:
        queryset = Brand.objects.trigram_search(q)

    return queryset


@router.post("brands/", response={201: BrandOut, 400: Message})
def create_brand(request, data: BrandIn):
    name = data.dict().get("name")
    if Brand.objects.filter(name__iexact=name).exists():
        print("Found something! Can't make a new brand")
        return 400, {"success": False, "message": "Brand already exists."}

    brand = Brand(**data.dict(), added_by=request.user)
    brand.save()
    return 201, brand


@router.get("categories/", response=List[CategoryOut])
def list_categories(request):
    return Category.objects.all()
