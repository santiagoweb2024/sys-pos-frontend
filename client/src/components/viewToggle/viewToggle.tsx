import { ReactNode } from "react";
import clsx from "clsx";

interface ViewOption {
  value: string;
  icon: ReactNode;
  label?: string;
}

interface ViewToggleProps {
  options: ViewOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ViewToggle({
  options,
  value,
  onChange,
  className
}: ViewToggleProps) {
  return (
    <div className={clsx("flex gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={clsx(
            "p-2 rounded-sm transition-colors",
            value === option.value 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 hover:bg-gray-300"
          )}
          aria-label={option.label}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
} 