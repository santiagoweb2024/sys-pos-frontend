import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn.util";
import { ChangeEvent } from "react";

type Option = {
  value: string;
  label: string;
};

type DropdownSelectProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
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
}: DropdownSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-surface-700 dark:text-surface-300">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={cn(dropdownSelectStyles(), className)}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
