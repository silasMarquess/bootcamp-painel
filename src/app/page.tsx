import { desc } from "drizzle-orm";
import Image from "next/image";

import { productTable } from "@/db/schema";

import db from "..";
import CategorySelector from "./components/commom/categorySelecttor";
import Header from "./components/commom/header";
import ProductList from "./components/commom/productHorizontalList";
import Foolter from "./components/commom/footer";

export default async function Home() {
  const productsList = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categoryList = await db.query.categoryTable.findMany();

  const newProductsList = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 100,
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-3 px-2">
        <Image
          src={"/foto_capa1.png"}
          alt="viva a vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="flex h-auto w-full"
        ></Image>

        <ProductList title="Lista dos mais vendidos" products={productsList} />
        <CategorySelector categoryList={categoryList} />

        <Image
          src={"/foto_capa2.png"}
          alt="viva a vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="flex h-auto w-full"
        ></Image>

        <ProductList title="Novidades" products={newProductsList} />
        <Foolter />
      </div>
    </>
  );
}
