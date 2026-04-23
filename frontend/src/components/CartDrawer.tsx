import type { CartItem, Product } from "../types";

type CartDrawerProps = {
  products: Product[];
  cart: CartItem[];
};

export function CartDrawer({ products, cart }: CartDrawerProps) {
  const lines = cart.map((line) => {
    const product = products.find((item) => item.id === line.product_id);
    return { ...line, product };
  });

  return (
    <section className="card">
      <h2>Cart</h2>
      {lines.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {lines.map((line) => (
            <li key={line.product_id}>
              <span>{line.product?.name}</span>
              <span>x{line.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
