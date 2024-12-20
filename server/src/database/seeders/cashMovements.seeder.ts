import { Db } from '@/shared/types/database/common/database.types';
import { cashMovements } from '../schemas/cashMovements';
import { CashMovementInsert } from '@/shared/types/database/entities/cashMovement.types';

const cashMovementsInitial: CashMovementInsert[] = [
  // Movimientos Caja 1 - Turno Mañana
  {
    cashRegisterId: 1,
    userId: 2, // Juan Pérez
    amount: '500.00',
    reason: 'Apertura de caja turno mañana',
    type: 'INITIAL_BALANCE',
  },
  {
    cashRegisterId: 1,
    userId: 2,
    amount: '350.30',
    reason: 'Venta #1001',
    type: 'CASH_IN',
  },
  {
    cashRegisterId: 1,
    userId: 2,
    amount: '250.00',
    reason: 'Retiro parcial autorizado',
    type: 'WITHDRAWAL',
  },
  {
    cashRegisterId: 1,
    userId: 2,
    amount: '1250.30',
    reason: 'Cierre de caja turno mañana',
    type: 'CLOSING_BALANCE',
  },

  // Movimientos Caja 2
  {
    cashRegisterId: 2,
    userId: 4, // Carlos López
    amount: '500.00',
    reason: 'Apertura de caja',
    type: 'INITIAL_BALANCE',
  },
  {
    cashRegisterId: 2,
    userId: 4,
    amount: '280.50',
    reason: 'Venta #1002',
    type: 'CASH_IN',
  },
  {
    cashRegisterId: 2,
    userId: 4,
    amount: '200.00',
    reason: 'Pago a proveedor menor',
    type: 'CASH_OUT',
  },
  {
    cashRegisterId: 2,
    userId: 4,
    amount: '980.50',
    reason: 'Cierre de caja',
    type: 'CLOSING_BALANCE',
  },

  // Movimientos Caja 3 (Cierre Forzado)
  {
    cashRegisterId: 3,
    userId: 5, // Ana Martínez
    amount: '500.00',
    reason: 'Apertura de caja',
    type: 'INITIAL_BALANCE',
  },
  {
    cashRegisterId: 3,
    userId: 3, // María González (Manager)
    amount: '0.00',
    reason: 'Cierre forzado por supervisor',
    type: 'CLOSING_BALANCE',
  },

  // Movimientos Caja 1 - Turno Tarde (Abierta)
  {
    cashRegisterId: 1,
    userId: 2,
    amount: '500.00',
    reason: 'Apertura de caja turno tarde',
    type: 'INITIAL_BALANCE',
  },
  {
    cashRegisterId: 1,
    userId: 2,
    amount: '150.80',
    reason: 'Venta #1003',
    type: 'CASH_IN',
  },

  // Movimientos Caja Express (Abierta)
  {
    cashRegisterId: 6,
    userId: 4,
    amount: '300.00',
    reason: 'Apertura de caja express',
    type: 'INITIAL_BALANCE',
  },
  {
    cashRegisterId: 6,
    userId: 4,
    amount: '125.30',
    reason: 'Venta #1004',
    type: 'CASH_IN',
  },
];

export const seedCashMovements = async (db: Db) => {
  await db.insert(cashMovements).values(cashMovementsInitial);
};
