/* eslint-disable @next/next/no-img-element */
"use client";
import DataTable from "@/components/dataTable/dataTable";
import { Pagination } from "@/components/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { Producto, ProductosService } from "@/services/productos.service";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductsHeader } from "./(components)/ProductsHeader";
import { clsx } from "clsx";
import SearchBar from "@/components/searchBar/searchBar";
import { ProductFilter } from "./(components)/ProductFilter";
export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEditar, setProductoEditar] = useState<Producto | undefined>();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // Cargar productos al montar el componente

  useEffect(() => {
    loadProductos();
  }, [currentPage, debouncedSearchTerm]);

  const loadProductos = async () => {
    try {
      setIsLoading(true);
      const { data, meta } = await ProductosService.getAll({
        page: currentPage,
        limit: 18, // Cambia según el tamaño de página deseado
        name: debouncedSearchTerm || undefined,
      });

      setProductos(data);
      setTotalPages(meta.pagination.totalPages); // Suponiendo que el backend devuelve totalPages
    } catch (error) {
      toast.error("Error al cargar los productos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setProductoEditar(undefined);
    setMostrarFormulario(true);
  };

  const handleEdit = (producto: Producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await ProductosService.delete(id);
        toast.success("Producto eliminado correctamente");
        loadProductos(); // Recargar la lista
      } catch (error) {
        toast.error("Error al eliminar el producto");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (productoData: Partial<Producto>) => {
    /*  if (productoEditar) {
      const producto = { ...productoEditar, ...productoData };
      await handleSave(producto);
    } else {
      const nuevoProducto = {
        ...productoData,
        id: Math.random().toString(36).substr(2, 9),
      } as Producto;
      await handleSave(nuevoProducto);
    }
    setMostrarFormulario(false); */
  };

  const handleSave = async (producto: Producto) => {
    try {
      if (productoEditar) {
        // Actualizar producto existente
        await ProductosService.update(productoEditar.id!, producto);
        toast.success("Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        await ProductosService.create(producto);
        toast.success("Producto creado correctamente");
      }
      loadProductos(); // Recargar la lista
    } catch (error) {
      toast.error("Error al guardar el producto");
      console.error(error);
    }
  };
  const handleSearhProduct = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const columns = [
    {
      key: "id",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Id
          <ArrowUpDown className="size-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
    },
    {
      key: "sku",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Código
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
    },
    {
      key: "nombre",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Nombre del Producto
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6",
      render: (producto: Producto) => (
        <div className="flex items-center gap-4">
          {producto.images.length > 0 && (
            <img
              src={producto.images[0].imageUrl}
              alt={producto.name}
              className="border border-surface-200/50 rounded-lg w-12 h-12 object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-surface-900 dark:text-surface-100">
              {producto.name}
            </span>
            <span className="text-surface-500 text-sm">
              SKU: {producto.sku}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "precio",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Precio
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="font-medium text-surface-900 dark:text-surface-100">
          $
          {producto.salePrice.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      key: "stock",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Inventario
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              "flex items-center gap-2 px-2.5 py-1 rounded-full font-medium text-xs",
              {
                "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400":
                  producto.stock > 10,
                "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400":
                  producto.stock > 0 && producto.stock <= 10,
                "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400":
                  producto.stock === 0,
              }
            )}
          >
            <span className="bg-current rounded-full w-1.5 h-1.5" />
            {producto.stock === 0 ? "Sin stock" : `${producto.stock} unidades`}
          </span>
        </div>
      ),
    },
    {
      key: "categoria",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Categoría
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="text-surface-700 dark:text-surface-300">
          {producto.category}
        </div>
      ),
    },
    {
      key: "codigo",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Código
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="font-mono text-surface-700 dark:text-surface-300 text-sm">
          {producto.sku || "N/A"}
        </div>
      ),
    },
    {
      key: "costo",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Costo
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="text-surface-700 dark:text-surface-300">
          $
          {producto.purchasePrice.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      key: "margen",
      header: (
        <div className="flex items-center gap-2 font-medium text-surface-500 text-sm">
          Margen
          <ArrowUpDown className="w-3.5 h-3.5 text-surface-400" />
        </div>
      ),
      className: "py-4 px-6 whitespace-nowrap",
      render: (producto: Producto) => {
        return (
          <div
            className={clsx(
              "font-medium text-sm",
              "text-red-600 dark:text-red-400"
            )}
          >
            {producto.purchasePrice}
          </div>
        );
      },
    },
    {
      key: "acciones",
      header: (
        <div className="font-medium text-surface-500 text-sm">Acciones</div>
      ),
      className: "py-4 px-6 text-right whitespace-nowrap",
      render: (producto: Producto) => (
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => handleEdit(producto)}
            className="hover:bg-primary-50 dark:hover:bg-primary-500/10 p-1.5 rounded-md text-surface-500 hover:text-primary-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(producto.id)}
            className="hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded-md text-surface-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="z-50 bg-surface-100 dark:bg-surface-800 shadow-xs backdrop-blur-xs px-4 py-2 border border-surface-200 dark:border-surface-700">
        <ProductsHeader onAdd={handleAdd} />
        <ProductFilter />
      </div>

      {/* Contenedor con scroll horizontal */}
      <div className="relative flex-1">
        <div className="absolute inset-0 overflow-auto scrollbar-thin dark:scrollbar-thin-error-700">
          <DataTable
            data={productos}
            columns={columns}
            emptyMessage="No hay productos disponibles"
          />
        </div>
      </div>
    </div>
  );
}
