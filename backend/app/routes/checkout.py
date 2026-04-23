from fastapi import APIRouter

from app.models.cart import CheckoutSessionRequest
from app.models.checkout import (
    CheckoutSessionResponse,
    ConfirmOrderRequest,
    ConfirmOrderResponse,
)
from app.services.checkout_service import confirm_order, create_checkout_session

router = APIRouter()


@router.post("/checkout/session", response_model=CheckoutSessionResponse)
def create_session(payload: CheckoutSessionRequest) -> CheckoutSessionResponse:
    return create_checkout_session(payload)


@router.post("/checkout/confirm", response_model=ConfirmOrderResponse)
def confirm(payload: ConfirmOrderRequest) -> ConfirmOrderResponse:
    return confirm_order(payload.session_id)
