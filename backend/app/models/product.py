from pydantic import BaseModel


class Product(BaseModel):
    id: str
    name: str
    price: int
    currency: str = "USD"
    stock: int
    description: str
    image: str | None = None
