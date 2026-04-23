from pydantic import BaseModel


class CheckoutSessionResponse(BaseModel):
    session_id: str
    currency: str
    subtotal: int
    tax: int
    shipping: int
    total: int
    status: str


class ConfirmOrderRequest(BaseModel):
    session_id: str


class ConfirmOrderResponse(BaseModel):
    order_id: str
    status: str
    message: str
