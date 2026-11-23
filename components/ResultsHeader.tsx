export type PriceSort = "price_asc" | "price_desc";

type ResultsHeaderProps = {
  count: number;
  sortOrder: PriceSort;
  onSortChange: (order: PriceSort) => void;
};

const SORT_LABELS: Record<PriceSort, string> = {
  price_asc: "precio, de menor a mayor",
  price_desc: "precio, de mayor a menor",
};

export default function ResultsHeader({ count, sortOrder, onSortChange }: ResultsHeaderProps) {
  const nextOrder: PriceSort = sortOrder === "price_asc" ? "price_desc" : "price_asc";

  return (
    <header className="px-4 py-4 text-center md:text-left">
      <h2 className="text-lg font-semibold">{count} alojamientos</h2>
      <button
        type="button"
        onClick={() => onSortChange(nextOrder)}
        className="mt-1 text-xs text-gray-500 underline"
      >
        Ordenado por {SORT_LABELS[sortOrder]}
      </button>
    </header>
  );
}
