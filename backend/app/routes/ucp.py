from fastapi import APIRouter

from app.config import settings

router = APIRouter()


@router.get("/.well-known/ucp.json")
def ucp_profile() -> dict:
    return {
        "protocol": "UCP",
        "version": "0.1-starter",
        "business": {
            "name": "Demo Merchant",
            "merchant_of_record": True,
            "base_url": settings.base_url,
        },
        "capabilities": [
            {"name": "checkout", "endpoint": "/api/checkout/session"},
            {"name": "order_management", "endpoint": "/api/checkout/confirm"},
        ],
    }
