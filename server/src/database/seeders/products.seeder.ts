import { Db } from '@/shared/types/database/common/database.types';
import { products } from '../schemas/products.schema';
import { ProductInsert } from '@/shared/types/database/entities/product.types';

const productsInitial: ProductInsert[] = [
  {
    sku: 'COCA-001',
    upc: '7501055300846',
    name: 'Coca Cola 600ml',
    description: 'Bebida refrescante',
    salePrice: '1.50',
    purchasePrice: '1.00',
    unitOfMeasurementId: 1,
    stock: 100,
    brandId: 4, // Coca-Cola
    categoryId: 1,
    supplierId: 1, // Bebidas del Norte
    productStatusId: 1,
  },
  {
    sku: 'LECHE-001',
    upc: '7501055300847',
    name: 'Leche Entera 1L',
    description: 'Leche fresca entera',
    salePrice: '1.20',
    purchasePrice: '0.90',
    unitOfMeasurementId: 1,
    stock: 200,
    brandId: 1, // Nestlé
    categoryId: 2,
    supplierId: 2, // Lácteos y Más
    productStatusId: 1,
  },
  {
    sku: 'PAN-001',
    upc: '7501055300848',
    name: 'Pan de Molde',
    description: 'Pan de molde fresco',
    salePrice: '0.80',
    purchasePrice: '0.60',
    unitOfMeasurementId: 1,
    stock: 150,
    brandId: 1, // Nestlé
    categoryId: 3,
    supplierId: 3, // Panadería del Valle
    productStatusId: 1,
  },
  {
    sku: 'JABON-001',
    upc: '7501055300849',
    name: 'Jabón de Tocador',
    description: 'Jabón para uso personal',
    salePrice: '0.50',
    purchasePrice: '0.30',
    unitOfMeasurementId: 1,
    stock: 300,
    brandId: 6, // Colgate-Palmolive
    categoryId: 4,
    supplierId: 4, // Higiene Personal S.A.
    productStatusId: 1,
  },
  {
    sku: 'CARNE-001',
    upc: '7501055300850',
    name: 'Carne de Res 1kg',
    description: 'Carne de res fresca',
    salePrice: '10.00',
    purchasePrice: '8.00',
    unitOfMeasurementId: 1,
    stock: 50,
    brandId: 6, // Colgate-Palmolive
    categoryId: 5,
    supplierId: 5, // Carnes del Sur
    productStatusId: 1,
  },
  {
    sku: 'ARROZ-001',
    upc: '7751271011493',
    name: 'Arroz Costeño 5kg',
    description: 'Arroz extra Costeño bolsa 5kg',
    salePrice: '22.90',
    purchasePrice: '19.50',
    unitOfMeasurementId: 1,
    stock: 30,
    brandId: 1, // Nestlé
    categoryId: 1,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'ACEITE-001',
    upc: '7751271027876',
    name: 'Aceite Primor 1L',
    description: 'Aceite vegetal Primor botella 1 litro',
    salePrice: '11.90',
    purchasePrice: '9.80',
    unitOfMeasurementId: 1,
    stock: 40,
    brandId: 2, // Unilever
    categoryId: 1,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'GALLETAS-001',
    upc: '7751271025678',
    name: 'Galletas Oreo',
    description: 'Galletas Oreo rellenas de crema 432g',
    salePrice: '3.90',
    purchasePrice: '2.80',
    unitOfMeasurementId: 1,
    stock: 80,
    brandId: 7, // Mondelez
    categoryId: 1,
    supplierId: 3, // Panadería del Valle
    productStatusId: 1,
  },
  {
    sku: 'YOGURT-001',
    upc: '7751271026789',
    name: 'Yogurt Gloria Fresa 1L',
    description: 'Yogurt Gloria sabor fresa botella 1 litro',
    salePrice: '5.90',
    purchasePrice: '4.50',
    unitOfMeasurementId: 1,
    stock: 45,
    brandId: 1, // Nestlé
    categoryId: 2,
    supplierId: 2, // Lácteos y Más
    productStatusId: 1,
  },
  {
    sku: 'FIDEOS-001',
    upc: '7751271027890',
    name: 'Fideos Don Vittorio Spaghetti',
    description: 'Fideos Don Vittorio Spaghetti N°32 500g',
    salePrice: '3.20',
    purchasePrice: '2.40',
    unitOfMeasurementId: 1,
    stock: 70,
    brandId: 2, // Unilever
    categoryId: 1,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'AZUCAR-001',
    upc: '7751271028901',
    name: 'Azúcar Rubia Cartavio 1kg',
    description: 'Azúcar rubia Cartavio bolsa 1kg',
    salePrice: '4.50',
    purchasePrice: '3.80',
    unitOfMeasurementId: 1,
    stock: 55,
    brandId: 1, // Nestlé
    categoryId: 1,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'MANTEQUILLA-001',
    upc: '7751271029012',
    name: 'Mantequilla Gloria 200g',
    description: 'Mantequilla Gloria barra 200g',
    salePrice: '6.90',
    purchasePrice: '5.50',
    unitOfMeasurementId: 1,
    stock: 40,
    brandId: 1, // Nestlé
    categoryId: 2,
    supplierId: 2, // Lácteos y Más
    productStatusId: 1,
  },
  {
    sku: 'DETERGENTE-001',
    upc: '7751271030123',
    name: 'Detergente Bolivar 2kg',
    description: 'Detergente en polvo Bolivar bolsa 2kg',
    salePrice: '23.90',
    purchasePrice: '19.50',
    unitOfMeasurementId: 1,
    stock: 35,
    brandId: 2, // Unilever
    categoryId: 4,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'JABON-002',
    upc: '7751271031234',
    name: 'Jabón Protex 3 pack',
    description: 'Jabón antibacterial Protex tripack 375g',
    salePrice: '8.90',
    purchasePrice: '6.70',
    unitOfMeasurementId: 1,
    stock: 50,
    brandId: 6, // Colgate-Palmolive
    categoryId: 5,
    supplierId: 4, // Higiene Personal S.A.
    productStatusId: 1,
  },
  {
    sku: 'PAPE-001',
    upc: '7751271032345',
    name: 'Papel Higiénico Elite 40m x 4',
    description: 'Papel higiénico Elite doble hoja 40m pack x 4',
    salePrice: '7.90',
    purchasePrice: '5.90',
    unitOfMeasurementId: 1,
    stock: 60,
    brandId: 8, // Elite
    categoryId: 5,
    supplierId: 7, // Limpieza y Desinfección S.A.
    productStatusId: 1,
  },
  {
    sku: 'AGUA-001',
    upc: '7751271033456',
    name: 'Agua San Luis 2.5L',
    description: 'Agua mineral sin gas San Luis botella 2.5L',
    salePrice: '3.50',
    purchasePrice: '2.30',
    unitOfMeasurementId: 1,
    stock: 75,
    brandId: 4, // Coca-Cola
    categoryId: 2,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
  {
    sku: 'CHOC-001',
    upc: '7751271034567',
    name: 'Chocolate Sublime 72g',
    description: 'Chocolate con maní Sublime tableta 72g',
    salePrice: '2.50',
    purchasePrice: '1.80',
    unitOfMeasurementId: 1,
    stock: 90,
    brandId: 1, // Nestlé
    categoryId: 6,
    supplierId: 6, // Distribuidora Alimentos S.A.
    productStatusId: 1,
  },
];

export const seedProducts = async (db: Db) => {
  await db.insert(products).values(productsInitial);
};
