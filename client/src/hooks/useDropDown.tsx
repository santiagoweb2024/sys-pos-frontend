import { RefObject, useEffect, useRef, useState } from "react";

type UseDropDownOptions = {
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
};

type UseDropDownReturn<TTrigger extends HTMLElement, TMenu extends HTMLElement> = {
  isOpen: boolean;
  triggerRef: RefObject<TTrigger>;
  menuRef: RefObject<TMenu>;
  toggleDropDown: () => void;
  closeDropDown: () => void;
};

export const useDropDown = <TTrigger extends HTMLElement, TMenu extends HTMLElement>({
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: UseDropDownOptions = {}): UseDropDownReturn<TTrigger, TMenu> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<TTrigger>(null);
  const menuRef = useRef<TMenu>(null);

  const toggleDropDown = () => setIsOpen((prev) => !prev);
  const closeDropDown = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeDropDown();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropDown();
      }
    };

    if (closeOnOutsideClick) document.addEventListener("click", handleOutsideClick);
    if (closeOnEscape) document.addEventListener("keyup", handleEscape);

    return () => {
      if (closeOnOutsideClick) document.removeEventListener("click", handleOutsideClick);
      if (closeOnEscape) document.removeEventListener("keyup", handleEscape);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEscape]);

  return { isOpen, triggerRef, menuRef, toggleDropDown, closeDropDown };
};
