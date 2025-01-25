export const buildGenericFilter = <T extends object>(
  filters: T,
): Partial<T> => {
  const filter = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {} as Partial<T>);
  return filter;
};
