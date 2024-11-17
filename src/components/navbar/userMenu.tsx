/* eslint-disable @next/next/no-img-element */
"use client";
import { User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface UserMenuProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export default function UserMenu({ userName, userEmail, onLogout }: UserMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src="/avatar.png"
          alt="Foto de perfil"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${userName}&background=random`;
          }}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 bg-popover border border-border rounded-md shadow-lg py-2 min-w-[200px]">
          <div className="px-4 py-2 border-b border-border">
            <p className="font-semibold">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          
          <div className="py-1">
            <Link 
              href="/perfil"
              className="w-full px-4 py-2 text-sm hover:bg-accent flex items-center gap-2"
            >
              <User size={16} />
              <span>Mi Perfil</span>
            </Link>
            
            <Link 
              href="/configuracion"
              className="w-full px-4 py-2 text-sm hover:bg-accent flex items-center gap-2"
            >
              <Settings size={16} />
              <span>Configuración</span>
            </Link>

            <div className="border-t border-border my-1"></div>
            
            <button 
              onClick={onLogout}
              className="w-full px-4 py-2 text-sm hover:bg-accent flex items-center gap-2 text-red-500"
            >
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}