from pydantic import BaseModel, EmailStr, Field


class CartItem(BaseModel):
    product_id: str
    quantity: int = Field(..., ge=1)


class Buyer(BaseModel):
    email: EmailStr
    country: str = "US"


class CheckoutSessionRequest(BaseModel):
    items: list[CartItem]
    buyer: Buyer
