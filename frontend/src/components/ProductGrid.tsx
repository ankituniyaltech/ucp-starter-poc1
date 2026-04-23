import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <section className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </section>
  );
}
