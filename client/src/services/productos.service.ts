import { API_ENDPOINTS } from "@/config/api.config";
import axiosInstance from "@/config/axios.config";
import { buildQueryString } from "@/utils/buildQueryString.util";
import { buildGenericFilter } from "@/utils/filterBuilder.util";

export interface Producto {
  id: number;
  sku: string;
  upc: string;
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  unitOfMeasurementId: number;
  stock: number;
  brandId: number;
  categoryId: number;
  supplierId: number;
  productStatusId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  images: Images[];
}
export interface Images {
  id: number;
  productId: number;
  imageUrl: string;
}
export interface Pagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Links {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
}

export interface Meta {
  pagination: Pagination;
  links: Links;
}

export interface GetProductsResponse {
  statusCode: number;
  type: string;
  message: string;
  data: Producto[];
  meta: Meta;
}
interface GetProductsQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  sku?: string;
  upc?: string;
}

export const ProductosService = {
  // Obtener todos los productos con paginación
  getAll: async (
    params: GetProductsQueryParams = { page: 1, limit: 10 }
  ): Promise<GetProductsResponse> => {
    try {
      const filter = buildGenericFilter(params);
      const queryString = buildQueryString(filter);
      const url = `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${queryString}`;
      const { data } = await axiosInstance.get<GetProductsResponse>(url);
      return data;
    } catch (error) {
      console.error("Error en getAll productos:", error);
      throw error;
    }
  },

  // Obtener un producto por ID
  getById: async (id: number): Promise<Producto> => {
    try {
      const { data } = await axiosInstance.get<Producto>(
        API_ENDPOINTS.PRODUCTS.GET_BY_ID(id)
      );
      return data;
    } catch (error) {
      console.error(`Error en getById producto ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo producto
  create: async (producto: Omit<Producto, "id">): Promise<Producto> => {
    try {
      const { data } = await axiosInstance.post<Producto>(
        API_ENDPOINTS.PRODUCTS.CREATE,
        producto
      );
      return data;
    } catch (error) {
      console.error("Error en create producto:", error);
      throw error;
    }
  },

  // Actualizar un producto
  update: async (
    id: number,
    producto: Partial<Producto>
  ): Promise<Producto> => {
    try {
      const { data } = await axiosInstance.put<Producto>(
        API_ENDPOINTS.PRODUCTS.UPDATE(id),
        producto
      );
      return data;
    } catch (error) {
      console.error(`Error en update producto ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un producto
  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
    } catch (error) {
      console.error(`Error en delete producto ${id}:`, error);
      throw error;
    }
  },
};
