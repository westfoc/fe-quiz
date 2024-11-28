import type { CategoryMap } from "~/types";
import { mapSelectedValues } from "~/utils";

interface CategoriesProps {
  categoryList: CategoryMap[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryMap[]>>;
}

export default function Categories({
  categoryList,
  setCategories,
}: CategoriesProps) {
  function handleSetCategories(category: CategoryMap) {
    const modifiedCategoryIsSelectedValue = mapSelectedValues(
      categoryList,
      category,
    );
    setCategories(modifiedCategoryIsSelectedValue);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categoryList.map((category: CategoryMap) => (
        <button
          key={category.name}
          name={category.name}
          className={`box-border inline-flex h-8 items-center justify-center gap-x-1 whitespace-nowrap rounded-full border border-transparent bg-neutral-200 px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-neutral-200 disabled:cursor-not-allowed ${category.isSelected ? "border-1 border border-violet-700 text-violet-700" : ""}`}
          onClick={(_) => handleSetCategories(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
