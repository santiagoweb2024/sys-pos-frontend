export const buildQueryString = <T extends object>(params: T): string => {
    const queryParams = new URLSearchParams();
  
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
  
    return queryParams.toString();
  };
  