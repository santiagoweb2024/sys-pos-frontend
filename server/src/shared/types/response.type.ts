// Interfaz para la información de paginación
export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Interfaz para meta información genérica
export interface MetaResponse {
  [key: string]: any;
  pagination?: PaginationMeta;
}

// Interfaz principal de respuesta
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  type?: string;
  data: T;
  meta?: MetaResponse;
}
