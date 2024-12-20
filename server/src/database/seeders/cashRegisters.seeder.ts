import { Db } from '@/shared/types/database/common/database.types';
import { cashResgisters } from '../schemas/cashRegisters';
import { CashRegisterInsert } from '@/shared/types/database/entities/cashRegister.types';

const cashRegistersInitial: CashRegisterInsert[] = [
  {
    name: 'Caja 1',
    location: 'Entrada Principal',
    status: 'ACTIVE',
  },
  {
    name: 'Caja 2',
    location: 'Entrada Principal',
    status: 'ACTIVE',
  },
  {
    name: 'Caja 3',
    location: 'Área de Abarrotes',
    status: 'ACTIVE',
  },
  {
    name: 'Caja 4',
    location: 'Área de Limpieza',
    status: 'INACTIVE',
  },
  {
    name: 'Caja 5',
    location: 'Área de Bebidas',
    status: 'MAINTENANCE',
  },
  {
    name: 'Caja Express',
    location: 'Entrada Secundaria',
    status: 'ACTIVE',
  },
];

export const seedCashRegisters = async (db: Db) => {
  await db.insert(cashResgisters).values(cashRegistersInitial);
};
