import { useEffect, useMemo, useState } from "react";

import { confirmOrder, createCheckoutSession, fetchProducts, fetchUcpProfile } from "../api/client";
import { CartDrawer } from "../components/CartDrawer";
import { CheckoutPanel } from "../components/CheckoutPanel";
import { Header } from "../components/Header";
import { ProductGrid } from "../components/ProductGrid";
import { StatusTimeline } from "../components/StatusTimeline";
import type {
  CartItem,
  CheckoutSessionResponse,
  OrderConfirmation,
  Product,
  UcpProfile,
} from "../types";

export function Home() {
  const [profile, setProfile] = useState<UcpProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [session, setSession] = useState<CheckoutSessionResponse | null>(null);
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [profileResponse, productsResponse] = await Promise.all([
          fetchUcpProfile(),
          fetchProducts(),
        ]);
        setProfile(profileResponse);
        setProducts(productsResponse);
      } catch {
        setError("Failed to load starter data.");
      }
    })();
  }, []);

  const stage = useMemo(() => {
    if (order) return "order" as const;
    if (session) return "session" as const;
    if (cart.length > 0) return "cart" as const;
    return "discovery" as const;
  }, [cart.length, order, session]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product_id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product_id: product.id, quantity: 1 }];
    });
  };

  const onCreateSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const created = await createCheckoutSession({
        items: cart,
        buyer: { email: "demo@example.com", country: "US" },
      });
      setSession(created);
    } catch {
      setError("Could not create checkout session.");
    } finally {
      setLoading(false);
    }
  };

  const onConfirmOrder = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const confirmed = await confirmOrder(session.session_id);
      setOrder(confirmed);
    } catch {
      setError("Could not confirm order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Header profile={profile} />
      {error && <p className="error">{error}</p>}
      <main>
        <ProductGrid products={products} onAdd={addToCart} />
        <aside>
          <CartDrawer products={products} cart={cart} />
          <CheckoutPanel
            cartCount={cart.length}
            session={session}
            order={order}
            loading={loading}
            onCreateSession={onCreateSession}
            onConfirmOrder={onConfirmOrder}
          />
        </aside>
      </main>
      <StatusTimeline stage={stage} />
    </div>
  );
}
