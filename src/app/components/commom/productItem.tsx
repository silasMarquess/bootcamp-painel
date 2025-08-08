import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCents } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ElementProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };

  textConteinerProduct: string;
}

const ProductItem = ({ product, textConteinerProduct }: ElementProps) => {
  const variant = product.variants[0];
  const url = variant.imageUrl.slice(2, variant.imageUrl.length - 2);
  return (
    <Link href={"/"}>
      <Image
        src={url}
        alt={"variant.name"}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-3xl"
      ></Image>

      <div
        className={cn(
          "flex max-w-[150px] flex-col space-y-2",
          textConteinerProduct,
        )}
      >
        <h4 className="truncate text-sm font-semibold">{product.name}</h4>
        <p className="truncate text-sm font-medium text-gray-600">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCents(variant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
