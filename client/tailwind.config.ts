import type { Config } from "tailwindcss";
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color principal - Verde fresco que representa crecimiento y frescura
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Color principal para botones y acciones
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Color secundario - Azul que transmite confianza y profesionalismo
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Color secundario para elementos destacados
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Grises personalizados para la interfaz
        surface: {
          50: "#ffffff", // Fondo principal claro
          100: "#f8fafc", // Fondo de tarjetas claro
          200: "#e2e8f0", // Bordes claro
          300: "#cbd5e1", // Bordes prominentes claro
          400: "#94a3b8", // Texto deshabilitado claro
          500: "#64748b", // Texto secundario claro
          600: "#475569", // Texto principal claro
          700: "#1e293b", // Fondos oscuros
          800: "#0f172a", // Fondos más oscuros
          900: "#020617", // Fondo muy oscuro
          950: "#000000", // Negro puro
        },
        // Estados y feedback
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          700: "#15803d",
        },
        warning: {
          50: "#fefce8",
          500: "#eab308",
          700: "#a16207",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          700: "#b91c1c",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [tailwindScrollbar({nocompatible:true})],
} satisfies Config;
