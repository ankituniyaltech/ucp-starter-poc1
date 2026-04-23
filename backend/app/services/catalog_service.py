import json
from pathlib import Path

from app.models.product import Product


DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "products.json"


def get_products() -> list[Product]:
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        raw = json.load(file)
    return [Product(**item) for item in raw]
