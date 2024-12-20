import { Db } from '@/shared/types/database/common/database.types';
import { cashSessions } from '../schemas/cashSessions';
import { CashSessionInsert } from '@/shared/types/database/entities/cashSession.types';

const cashSessionsInitial: CashSessionInsert[] = [
  {
    cashRegisterId: 1, // Caja 1
    userId: 2, // Juan Pérez (Cajero)
    openingBalance: '500.00',
    closingBalance: '1250.30',
    startTime: new Date('2024-12-18T08:00:00'),
    endTime: new Date('2024-12-18T16:00:00'),
    status: 'CLOSED',
  },
  {
    cashRegisterId: 2, // Caja 2
    userId: 4, // Carlos López (Cajero)
    openingBalance: '500.00',
    closingBalance: '980.50',
    startTime: new Date('2024-12-18T08:00:00'),
    endTime: new Date('2024-12-18T16:00:00'),
    status: 'CLOSED',
  },
  {
    cashRegisterId: 3, // Caja 3
    userId: 5, // Ana Martínez (Cajero)
    openingBalance: '500.00',
    closingBalance: '0.00',
    startTime: new Date('2024-12-18T08:00:00'),
    endTime: new Date('2024-12-18T12:00:00'),
    status: 'FORCE_CLOSED',
  },
  {
    cashRegisterId: 1, // Caja 1
    userId: 2, // Juan Pérez (Cajero)
    openingBalance: '500.00',
    closingBalance: '0.00',
    startTime: new Date('2024-12-18T16:00:00'),
    endTime: new Date('2024-12-19T00:00:00'),
    status: 'OPEN',
  },
  {
    cashRegisterId: 6, // Caja Express
    userId: 4, // Carlos López (Cajero)
    openingBalance: '300.00',
    closingBalance: '0.00',
    startTime: new Date('2024-12-18T14:00:00'),
    endTime: new Date('2024-12-18T22:00:00'),
    status: 'OPEN',
  },
];

export const seedCashSessions = async (db: Db) => {
  await db.insert(cashSessions).values(cashSessionsInitial);
};
