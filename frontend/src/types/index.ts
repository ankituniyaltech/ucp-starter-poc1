export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  description: string;
  image?: string;
};

export type CartItem = {
  product_id: string;
  quantity: number;
};

export type Buyer = {
  email: string;
  country: string;
};

export type CheckoutSessionRequest = {
  items: CartItem[];
  buyer: Buyer;
};

export type CheckoutSessionResponse = {
  session_id: string;
  currency: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
};

export type OrderConfirmation = {
  order_id: string;
  status: string;
  message: string;
};

export type UcpProfile = {
  protocol: string;
  version: string;
  business: {
    name: string;
    merchant_of_record: boolean;
    base_url: string;
  };
  capabilities: Array<{ name: string; endpoint: string }>;
};
