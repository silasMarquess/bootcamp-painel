"use client";

import { map } from "zod";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./productItem";

interface ElementProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ products, title }: ElementProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex w-full flex-row gap-4 overflow-x-auto">
        {" "}
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
