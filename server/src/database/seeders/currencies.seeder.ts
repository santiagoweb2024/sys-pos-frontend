// currencies.seeder.ts

import { Db } from '@/shared/types/database/common/database.types';
import { currencies } from '../schemas/currencies.schema';
import { CurrencyInsert } from '@/shared/types/database/entities/currency.types';

const currenciesInitial: CurrencyInsert[] = [
  {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    description: 'Official currency of the United States',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    description: 'Official currency of the European Union',
  },
  {
    code: 'MXN',
    name: 'Mexican Peso',
    symbol: '$',
    description: 'Official currency of Mexico',
  },
  {
    code: 'COP',
    name: 'Colombian Peso',
    symbol: '$',
    description: 'Official currency of Colombia',
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    description: 'Official currency of Brazil',
  },
  {
    code: 'ARS',
    name: 'Argentine Peso',
    symbol: '$',
    description: 'Official currency of Argentina',
  },
  {
    code: 'PEN',
    name: 'Peruvian Sol',
    symbol: 'S/',
    description: 'Official currency of Peru',
  },
];

export const seedCurrencies = async (db: Db) => {
  await db.insert(currencies).values(currenciesInitial);
};
