import { ChangeEvent, ReactNode } from "react";
import { cn } from "@/utils/cn.util";
import { cva } from "class-variance-authority";

type Option = {
  value: string;
  label: string | ReactNode; // Permite opciones personalizadas (texto, iconos, etc.)
};

type DropdownSelectProps = {
  label?: string;
  options: Option[];
  value?: string | string[]; // Puede ser un solo valor o varios valores
  onChange?: (value: string | string[]) => void; // Función para manejar cambios
  className?: string;
  placeholder?: string;
  multiple?: boolean; // Para habilitar selección múltiple
  isLoading?: boolean; // Para manejar el estado de carga
  renderOption?: (option: Option) => ReactNode; // Permite personalizar el renderizado de las opciones
  disabled?: boolean; // Para deshabilitar el select
};

const dropdownSelectStyles = cva(
  "h-9 px-3 rounded-lg border bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-400",
  {
    variants: {
      variant: {
        default: "border-surface-200 dark:border-surface-700",
        error: "border-red-500",
        success: "border-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const DropdownSelect = ({
  label,
  options,
  value,
  onChange,
  className,
  placeholder = "Seleccione una opción",
  multiple = false,
  isLoading = false,
  renderOption,
  disabled = false,
}: DropdownSelectProps) => {
  // Manejador de cambios de selección
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (multiple) {
      const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
      onChange && onChange(selectedValues); // Llamada al onChange con los valores seleccionados
    } else {
      onChange && onChange(newValue); // Llamada al onChange con un único valor
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-surface-700 dark:text-surface-300">{label}</label>}
      <select
        value={value}
        onChange={handleSelectChange}
        className={cn(dropdownSelectStyles(), className)}
        multiple={multiple}
        disabled={isLoading || disabled} // Desactivar si está en carga o deshabilitado
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {isLoading ? (
          <option disabled>Cargando...</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {renderOption ? renderOption(option) : option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
