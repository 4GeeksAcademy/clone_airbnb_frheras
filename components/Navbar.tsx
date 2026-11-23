type NavbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function Navbar({ query, onQueryChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b bg-white px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <span className="shrink-0 text-lg font-bold text-rose-500">Alojamientos</span>
        <label className="flex h-12 flex-1 items-center gap-2 rounded-full border px-4 shadow-sm focus-within:shadow-md">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Empieza a buscar"
            aria-label="Buscar alojamientos"
            className="w-full bg-transparent outline-none"
          />
        </label>
      </div>
    </header>
  );
}
