from uuid import uuid4

from fastapi import HTTPException

from app.models.cart import CheckoutSessionRequest
from app.models.checkout import CheckoutSessionResponse, ConfirmOrderResponse
from app.services.catalog_service import get_products


def create_checkout_session(payload: CheckoutSessionRequest) -> CheckoutSessionResponse:
    products = {p.id: p for p in get_products()}
    subtotal = 0

    for item in payload.items:
        product = products.get(item.product_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product not found: {item.product_id}")
        if item.quantity > product.stock:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")
        subtotal += product.price * item.quantity

    tax = int(subtotal * 0.08)
    shipping = 500 if subtotal < 5000 else 0
    total = subtotal + tax + shipping

    return CheckoutSessionResponse(
        session_id=f"sess_{uuid4().hex[:8]}",
        currency="USD",
        subtotal=subtotal,
        tax=tax,
        shipping=shipping,
        total=total,
        status="session_created",
    )


def confirm_order(session_id: str) -> ConfirmOrderResponse:
    return ConfirmOrderResponse(
        order_id=f"ord_{uuid4().hex[:8]}",
        status="confirmed",
        message=f"Order confirmed for session {session_id}",
    )
