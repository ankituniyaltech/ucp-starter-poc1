import axios from "axios";
import type {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  OrderConfirmation,
  Product,
  UcpProfile,
} from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
});

export const fetchUcpProfile = async (): Promise<UcpProfile> => {
  const response = await api.get<UcpProfile>("/.well-known/ucp.json");
  return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/api/products");
  return response.data;
};

export const createCheckoutSession = async (
  payload: CheckoutSessionRequest,
): Promise<CheckoutSessionResponse> => {
  const response = await api.post<CheckoutSessionResponse>("/api/checkout/session", payload);
  return response.data;
};

export const confirmOrder = async (session_id: string): Promise<OrderConfirmation> => {
  const response = await api.post<OrderConfirmation>("/api/checkout/confirm", { session_id });
  return response.data;
};
