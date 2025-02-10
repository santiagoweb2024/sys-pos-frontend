export const buildGenericFilter = <T extends object>(
    filters: T,
  ): { [key in keyof T]: Exclude<T[key], undefined | null | ''> } => {
    const filter = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          return { ...acc, [key]: value };
        }
        return acc;
      },
      {} as { [key in keyof T]: Exclude<T[key], undefined | null | ''> },
    );
    return filter;
  };
