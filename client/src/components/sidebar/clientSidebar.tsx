/* eslint-disable @next/next/no-img-element */
"use client";
import { clsx } from "clsx";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Receipt, 
  BarChart3, 
  Settings, 
  Clock,
  DollarSign
} from "lucide-react";
import { useSidebarStore } from "@/store/useSidebarStore";
import Link from "next/link";

export default function ClientSidebar() {
  const { isCollapsed } = useSidebarStore();

  return (
    <aside
      className={clsx(
        "h-screen min-h-screen max-h-screen shrink-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 ease-in-out rounded-r-2xl",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <header className="h-[60px] w-full p-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center">
        <img
          src="/logoTienda.png"
          alt="logo"
          className="w-10 h-10 object-cover aspect-square shrink-0"
        />
      </header>

      <nav className="p-2 flex flex-col gap-2">
        <ul className="flex flex-col gap-1">
          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center px-3">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <LayoutDashboard className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/nueva-venta" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <ShoppingCart className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Nueva Venta</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/productos" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <Package className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Productos</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/inventario" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <BarChart3 className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Inventario</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/clientes" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <Users className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Clientes</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/facturas" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <Receipt className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Facturas</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/caja" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <DollarSign className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Caja</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/historial" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <Clock className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Historial</span>}
            </Link>
          </li>

          <li className="h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  flex items-center px-3">
            <Link 
              href="/configuracion" 
              className="flex items-center gap-3 w-full transition-all duration-300 ease-in-out"
            >
              <span className="min-w-6 flex items-center">
                <Settings className="size-6" />
              </span>
              {!isCollapsed && <span className="whitespace-nowrap">Configuración</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}