import { useState, useEffect } from "react";

/**
 * Custom hook para aplicar debounce a un valor
 * @param value - El valor que se desea debouncear
 * @param delay - El tiempo de espera para el debounce en milisegundos
 * @returns El valor debounced
 */
export const useDebounce = <T,>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
    return debouncedValue;
};
