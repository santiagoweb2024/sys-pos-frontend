/* eslint-disable @next/next/no-img-element */
"use client";
import { Menu, AlignLeft, Settings } from "lucide-react";
import Link from "next/link";
import { useSidebarStore } from "@/store/useSidebarStore";
import ThemeModeToggle from "../themeModeToggle";
import NotificationBell from "./notificationBell";
import CashierInfo from "./cashierInfo";
import UserMenu from "./userMenu";

export default function Navbar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <nav className="w-full h-[60px] flex justify-between items-center border-b border-gray-200 dark:border-gray-800  px-4">
      {/* Sección izquierda */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          {isCollapsed ? <Menu /> : <AlignLeft />}
        </button>
        <h1 className="font-bold text-lg">Mi Sistema POS</h1>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-4">
        <ThemeModeToggle />
        
        {/* Link de configuración */}
        <Link 
          href="/configuracion"
          className="p-2 hover:bg-accent rounded-full transition-colors"
          title="Configuración"
        >
          <Settings size={20} />
        </Link>

        <NotificationBell />
        <CashierInfo />
        <UserMenu 
          userName="Juan Pérez"
          userEmail="juan@ejemplo.com"
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
