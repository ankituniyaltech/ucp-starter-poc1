import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="card product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-footer">
        <strong>${(product.price / 100).toFixed(2)}</strong>
        <button onClick={() => onAdd(product)}>Add</button>
      </div>
    </article>
  );
}
