import type { Category } from "@/types";

type CategoryFilterProps = {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function CategoryFilter({ categories, activeId, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3">
      {categories.map((category) => {
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category.id)}
            className={`h-10 shrink-0 rounded-full border px-4 text-sm ${
              isActive ? "border-black font-semibold text-black" : "border-gray-300 text-gray-600 hover:border-gray-500"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
