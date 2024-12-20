// Tipo para metadatos de paginación
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Tipo para respuestas paginadas
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// Tipo base para todas las respuestas
export interface BaseResponse {
  statusCode: number;
  message: string;
}

// Tipo para respuestas exitosas
export interface SuccessResponse<T> extends BaseResponse {
  data: T | PaginatedResponse<T>;
}

// Tipo para respuestas de error
export interface ErrorResponse extends BaseResponse {
  error: string;
}

// Tipo unión para todas las respuestas posibles
export type Response<T> = SuccessResponse<T> | ErrorResponse;

// Tipo para excepciones HTTP de NestJS
export interface HttpExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

// Tipo para opciones de paginación en las peticiones
export interface PaginationOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
