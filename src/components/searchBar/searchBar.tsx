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
  icon = <Search />,
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
          "w-full h-11 rounded-lg border",
          iconPosition === 'left' ? 'pl-12 pr-4' : 'pl-4 pr-12',
          inputClassName
        )}
      />
      
      {rightElement}
    </div>
  );
}
