from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.checkout import router as checkout_router
from app.routes.health import router as health_router
from app.routes.products import router as products_router
from app.routes.ucp import router as ucp_router

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(ucp_router)
app.include_router(products_router, prefix="/api")
app.include_router(checkout_router, prefix="/api")
