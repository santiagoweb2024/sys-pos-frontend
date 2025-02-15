export class PaginationHelper {
  /**
   * Genera los parámetros de paginación a partir de la query recibida.
   * @param query Parámetros de paginación recibidos en la request.
   * @returns Objeto con `limit`, `offset` y `page`.
   */
  static generatePaginationParams(query: { page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    
    return { limit, offset: (page - 1) * limit, page };
  }

  /**
   * Calcula los metadatos de paginación a partir de los resultados obtenidos.
   * @param totalItems Número total de elementos en la base de datos.
   * @param page Página actual.
   * @param limit Límite de elementos por página.
   * @param itemCount Cantidad de elementos devueltos en la consulta.
   * @returns Objeto con metadatos de paginación.
   */
  static getPaginationMeta(totalItems: number, page: number, limit: number, itemCount: number) {
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1;

    return {
      totalItems,        // Total de elementos en la BD
      totalPages,        // Total de páginas disponibles
      currentPage: page, // Página actual
      itemCount,         // Cantidad de elementos en la página actual
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
}
