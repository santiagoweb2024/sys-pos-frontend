import { Db } from '@/shared/types/database/common/database.types';
import { businessInfo } from '../schemas/businessInfo.schema';
import { BusinessInfoInsert } from '@/shared/types/database/entities/businessInfo.types';

const businessInfoInitial: BusinessInfoInsert[] = [
  {
    name: 'Abarrotes Don José',
    legalName: 'Comercializadora Don José S.A.',
    email: 'contacto@abarrotesdonjose.com',
    phone: '+51987654321',
    address: 'Av. Principal 123, Lima, Perú',
    websiteUrl: 'https://www.abarrotesdonjose.com',
    logoUrl: '/assets/images/logo.png',
    businessType: 'COMPANY',
    taxId: '20123456789',
    timeZone: 'America/Lima',
    currencyId: 7, // ID de la moneda PEN (Sol Peruano)
  },
];

export const seedBusinessInfo = async (db: Db) => {
  await db.insert(businessInfo).values(businessInfoInitial);
};
