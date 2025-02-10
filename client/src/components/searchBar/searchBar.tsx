import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  rightElement?: ReactNode;
  className?: string;
  inputClassName?: string;
}

export default function SearchBar({
  icon = <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 dark:text-surface-500 w-5 h-5" />,
  iconPosition = 'left',
  rightElement,
  className,
  inputClassName,
  ...inputProps
}: SearchBarProps) {
  return (
    <div className={clsx("relative", className)} role="search">
      <div 
        className={clsx(
          "absolute top-1/2 -translate-y-1/2",
          iconPosition === 'left' ? 'left-3' : 'right-3'
        )}
        aria-hidden="true"
      >
        {icon}
      </div>
      
      <input
        type="text"
        {...inputProps}
        className={clsx(
          "w-full pl-12 pr-4 py-2 bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent placeholder-surface-400 dark:placeholder-surface-500",
          inputClassName
        )}
      />
      
      {rightElement}
    </div>
  );
}
