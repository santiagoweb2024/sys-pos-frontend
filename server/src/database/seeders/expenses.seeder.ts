import { Db } from '@/shared/types/database/common/database.types';
import { expenses } from '../schemas/expenses.schema';
import { ExpenseInsert } from '@/shared/types/database/entities/expense.types';

const expensesInitial: ExpenseInsert[] = [
  {
    description: 'Compra de productos de limpieza',
    amount: '250.00',
    paymentMethodId: 1, // Efectivo
    date: new Date('2024-12-18'),
    note: 'Productos de limpieza para el local',
    category: 'INVENTARIO',
  },
  {
    description: 'Mantenimiento de caja registradora',
    amount: '180.00',
    paymentMethodId: 2, // Tarjeta de Crédito
    date: new Date('2024-12-18'),
    note: 'Servicio técnico para Caja 5',
    category: 'OTHER',
  },
  {
    description: 'Almuerzo personal',
    amount: '85.50',
    paymentMethodId: 1, // Efectivo
    date: new Date('2024-12-18'),
    note: 'Almuerzo para personal del turno mañana',
    category: 'FOOD',
  },
  {
    description: 'Transporte de mercadería',
    amount: '120.00',
    paymentMethodId: 3, // Transferencia Bancaria
    date: new Date('2024-12-18'),
    note: 'Flete de productos nuevos',
    category: 'TRAVEL',
  },
  {
    description: 'Botiquín de primeros auxilios',
    amount: '75.90',
    paymentMethodId: 1, // Efectivo
    date: new Date('2024-12-18'),
    note: 'Reposición de implementos médicos',
    category: 'MEDICAL',
  },
  {
    description: 'Compra de útiles de oficina',
    amount: '45.80',
    paymentMethodId: 2, // Tarjeta de Crédito
    date: new Date('2024-12-18'),
    note: 'Papel, lapiceros y otros útiles',
    category: 'OTHER',
  },
];

export const seedExpenses = async (db: Db) => {
  await db.insert(expenses).values(expensesInitial);
};
