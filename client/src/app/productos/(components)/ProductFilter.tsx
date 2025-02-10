export const ProductFilter = () => {
  return (
    <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 py-4">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {/* <SearchBar
            value={searchTerm}
            onChange={handleSearhProduct}
            placeholder="Buscar productos..."
          /> */}

          <select className="h-9 px-3 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
            <option value="">Categoría</option>
            <option value="electronics">Electrónicos</option>
            <option value="clothing">Ropa</option>
          </select>

          <select className="h-9 px-3 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
            <option value="">Estado</option>
            <option value="in-stock">En stock</option>
            <option value="low-stock">Stock bajo</option>
            <option value="out-of-stock">Sin stock</option>
          </select>

          <select className="h-9 px-3 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
            <option value="">Ordenar por</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio menor a mayor</option>
            <option value="price-desc">Precio mayor a menor</option>
          </select>
        </div>

        {/* <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
            maxVisible={5}
          /> */}
      </div>
    </div>
  );
};
