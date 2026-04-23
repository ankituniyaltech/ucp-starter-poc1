import type { CheckoutSessionResponse, OrderConfirmation } from "../types";

type CheckoutPanelProps = {
  cartCount: number;
  session: CheckoutSessionResponse | null;
  order: OrderConfirmation | null;
  loading: boolean;
  onCreateSession: () => void;
  onConfirmOrder: () => void;
};

export function CheckoutPanel({
  cartCount,
  session,
  order,
  loading,
  onCreateSession,
  onConfirmOrder,
}: CheckoutPanelProps) {
  return (
    <section className="card">
      <h2>Checkout</h2>
      <button disabled={loading || cartCount === 0} onClick={onCreateSession}>
        Create Checkout Session
      </button>
      {session && (
        <div className="session-box">
          <p>Session: {session.session_id}</p>
          <p>Total: ${(session.total / 100).toFixed(2)}</p>
          <button disabled={loading} onClick={onConfirmOrder}>
            Confirm Order
          </button>
        </div>
      )}
      {order && <p className="success">✅ {order.message}</p>}
    </section>
  );
}
