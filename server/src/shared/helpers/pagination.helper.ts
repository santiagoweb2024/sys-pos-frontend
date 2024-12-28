import { ConfigService } from '@nestjs/config';

export interface PaginationQueryParams {
  page?: number;
  limit?: number;
}

export interface PaginationDatabaseParams {
  limit: number;
  offset: number;
}

export interface PaginationMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationLinks {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
}

export interface PaginationMetaParams {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  query?: Record<string, any>;
  path: string;
}

export class PaginationHelper {
  private static configService: ConfigService;

  static setConfigService(configService: ConfigService) {
    PaginationHelper.configService = configService;
  }

  static toDatabase(query: PaginationQueryParams): PaginationDatabaseParams {
    const page = Math.max(query.page ?? 1, 1);
    const limit = Math.max(query.limit ?? 10, 1);
    const offset = (page - 1) * limit;

    return {
      limit,
      offset,
    };
  }

  static createMeta(params: PaginationMetaParams): {
    meta: {
      pagination: PaginationMetaData;
      links: PaginationLinks;
    };
  } {
    const {
      totalItems,
      itemsPerPage,
      currentPage,
      totalPages,
      itemCount,
      query = {},
      path,
    } = params;

    // Obtener la BASE_URL que ya incluye el prefijo API_PREFIX
    const baseUrl =
      PaginationHelper.configService?.get('BASE_URL') ??
      'http://localhost:3000/v1/api/store/';

    // Crear los links de paginación manteniendo los query params
    const createUrl = (page: number) => {
      const queryParams = new URLSearchParams({
        ...query,
        page: page.toString(),
        limit: itemsPerPage.toString(),
      }).toString();
      // Removemos el slash final de baseUrl si existe y el slash inicial de path si existe
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      return `${baseUrl}${cleanPath}?${queryParams}`;
    };

    return {
      meta: {
        pagination: {
          totalItems,
          itemCount,
          itemsPerPage,
          totalPages,
          currentPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
        links: {
          first: createUrl(1),
          previous: currentPage > 1 ? createUrl(currentPage - 1) : null,
          next: currentPage < totalPages ? createUrl(currentPage + 1) : null,
          last: createUrl(totalPages),
        },
      },
    };
  }
}
