from fastapi import APIRouter

from app.models.product import Product
from app.services.catalog_service import get_products

router = APIRouter()


@router.get("/products", response_model=list[Product])
def list_products() -> list[Product]:
    return get_products()
