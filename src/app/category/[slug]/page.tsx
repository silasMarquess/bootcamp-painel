import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Header from "@/app/components/commom/header";
import ProductItem from "@/app/components/commom/productItem";
import { categoryTable, productTable } from "@/db/schema";
import db from "@/index";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductCatalog = async ({ params }: PageProps) => {
  const { slug } = await params;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) return notFound();

  const productsList = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <h2 className="text-sm font-semibold">{slug}</h2>
      <div className="grid w-full grid-cols-2 items-center justify-center gap-4 p-2">
        {productsList.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            textConteinerProduct="max-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default ProductCatalog;
