import { Button } from "@/components/ui/button";
import { categoryTable } from "@/db/schema";
import db from "@/index";

interface CategorySelectorProps {
  categoryList: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categoryList }: CategorySelectorProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {" "}
      <h3 className="font-semibold">Categorias</h3>
      <div className="grid grid-cols-2 gap-4 rounded-3xl bg-[#F4EFFF] px-2 py-10">
        {categoryList.map((category) => (
          <Button key={category.id} variant={"outline"} className="rounded-3xl">
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
