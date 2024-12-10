import { Cliente, CompraCliente } from "@/interfaces/cliente.interface";

export const CLIENTES_MOCK: Cliente[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    documento: "12345678",
    telefono: "555-0123",
    email: "juan@email.com",
    direccion: "Calle Principal 123",
    fechaRegistro: new Date("2023-01-15"),
    totalCompras: 1500.50,
    ultimaCompra: new Date("2024-01-10"),
    estado: "activo"
  },
  {
    id: "2",
    nombre: "María García",
    documento: "87654321",
    telefono: "555-0124",
    email: "maria@email.com",
    direccion: "Avenida Central 456",
    fechaRegistro: new Date("2023-02-20"),
    totalCompras: 2300.75,
    ultimaCompra: new Date("2024-01-15"),
    estado: "activo"
  },
  {
    id: "3",
    nombre: "Carlos López",
    documento: "23456789",
    telefono: "555-0125",
    email: "carlos@email.com",
    direccion: "Plaza Mayor 789",
    fechaRegistro: new Date("2023-03-10"),
    totalCompras: 800.25,
    ultimaCompra: new Date("2023-12-28"),
    estado: "activo"
  },
  {
    id: "4",
    nombre: "Ana Martínez",
    documento: "34567890",
    telefono: "555-0126",
    email: "ana@email.com",
    direccion: "Calle Secundaria 321",
    fechaRegistro: new Date("2023-04-05"),
    totalCompras: 3200.00,
    ultimaCompra: new Date("2024-01-05"),
    estado: "activo"
  },
  {
    id: "5",
    nombre: "Pedro Sánchez",
    documento: "45678901",
    telefono: "555-0127",
    email: "pedro@email.com",
    direccion: "Avenida Principal 654",
    fechaRegistro: new Date("2023-05-15"),
    totalCompras: 150.75,
    estado: "inactivo"
  }
];

export const COMPRAS_MOCK: CompraCliente[] = [
  {
    id: "1",
    fecha: new Date("2024-01-10"),
    total: 250.50,
    productos: [
      { nombre: "Arroz Premium", cantidad: 2, precio: 50.25 },
      { nombre: "Aceite de Oliva", cantidad: 1, precio: 150.00 }
    ],
    estado: "completada",
    metodoPago: "efectivo"
  },
  {
    id: "2",
    fecha: new Date("2024-01-15"),
    total: 480.75,
    productos: [
      { nombre: "Leche Deslactosada", cantidad: 3, precio: 85.25 },
      { nombre: "Pan Integral", cantidad: 2, precio: 45.00 },
      { nombre: "Huevos Orgánicos", cantidad: 1, precio: 135.00 }
    ],
    estado: "completada",
    metodoPago: "tarjeta"
  },
  {
    id: "3",
    fecha: new Date("2023-12-28"),
    total: 800.25,
    productos: [
      { nombre: "Carne Premium", cantidad: 2, precio: 350.00 },
      { nombre: "Verduras Frescas", cantidad: 1, precio: 100.25 }
    ],
    estado: "completada",
    metodoPago: "transferencia"
  }
];
