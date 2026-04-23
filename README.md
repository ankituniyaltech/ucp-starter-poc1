# UCP Starter POC

A UCP-inspired starter project with a React + Vite frontend and a FastAPI backend.

## Project structure

- `backend/`: FastAPI API for discovery, products, checkout session creation, and order confirmation.
- `frontend/`: React UI for browsing products, adding to cart, creating checkout session, and confirming an order.

## Run backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend expects backend at `http://localhost:8000` by default.
