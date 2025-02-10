import { ProductImagesInsert } from '@/shared/types/database/entities/productImages.types';
import { productImages } from '../schemas/productImages.schema';
import { Db } from '@/shared/types/database/common/database.types';

const productImagesInitial: ProductImagesInsert[] = [
  {
    productId: 1, // Coca Cola 600ml
    imageUrl:
      'https://chalosgrocery.com/assets/uploads/3114244c9e262162560f0655b45e12c4.jpg',
  },
  {
    productId: 2, // Leche Entera 1L
    imageUrl:
      'https://plazavea.vteximg.com.br/arquivos/ids/24844118-1000-1000/358217.jpg?v=638090212746770000',
  },
  {
    productId: 3, // Pan de Molde
    imageUrl:
      'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202011/16/00120654802535____6__1200x1200.jpg',
  },
  {
    productId: 4, // Jabón de Tocador
    imageUrl:
      'https://res.cloudinary.com/walmart-labs/image/upload/d_default.jpg/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750954607473l.jpg',
  },
  {
    productId: 5, // Carne de Res 1kg
    imageUrl:
      'https://walmartcr.vtexassets.com/arquivos/ids/370347/Carne-La-Hacienda-Mechar-Res-Tenderizado-1Kg-1-27532.jpg?v=638066398464330000',
  },
  {
    productId: 6, // Arroz Costeño 5kg
    imageUrl:
      'https://www.miamarket.pe/assets/uploads/ecc3d0638f2a8c5bf9978884c90e9c68.jpg?v=1',
  },
  {
    productId: 7, // Aceite Primor 1L
    imageUrl:
      'https://www.favel.pe/wp-content/uploads/2021/06/primor_clasico_1_lt-600x686.png',
  },
  {
    productId: 8, // Galletas Oreo
    imageUrl:
      'https://www.costco.com.mx/medias/sys_master/products/hd0/h3d/61769842163742.jpg',
  },
  {
    productId: 9, // Yogurt Gloria Fresa 1L
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gloria.com.pe%2Fuploads%2Fproducts%2Flacteos%2F2022092816643924841.jpg&f=1&nofb=1&ipt=c9f4bed40fc716dd1a601aabe518e8795c537a3b583fbaf85b576f9606a58934&ipo=images',
  },
  {
    productId: 10, // Fideos Don Vittorio Spaghetti
    imageUrl:
      'https://plazavea.vteximg.com.br/arquivos/ids/270599-1000-1000/20184805.jpg?v=637109876540100000',
  },
  {
    productId: 11, // Azúcar Rubia Cartavio 1kg
    imageUrl:
      'https://vivanda.vteximg.com.br/arquivos/ids/168287-1000-1000/944456.jpg',
  },
  {
    productId: 12, // Mantequilla Gloria 200g
    imageUrl:
      'https://plazavea.vteximg.com.br/arquivos/ids/240083-1000-1000/15555.jpg?v=637045215737300000',
  },
  {
    productId: 13, // Detergente Bolivar 2kg
    imageUrl:
      'https://supercampesino.com/wp-content/uploads/2022/07/DET.-BOLIVAR-MATIC-2KG-4620Bs..jpg',
  },
  {
    productId: 14, // Jabón Protex 3 pack
    imageUrl:
      'https://hipermercadosiberia.com/wp-content/uploads/2021/02/JABON-PROTEX-3-PACK-110G-OATS.png',
  },
  {
    productId: 15, // Papel Higiénico Elite 40m x 4
    imageUrl:
      'https://offimania.cl/wp-content/uploads/2018/06/ELITE-PAPEL-HIGIENICO-ULTRA-DOBLE-HOJA-4ROLLOS30mts.jpg',
  },
  {
    productId: 16, // Agua San Luis 2.5L
    imageUrl:
      'https://cdn.acelerala.com/files/uploads/1499/1596061827-30-san-luis-con-gas-2-5-lt-jpg.jpg',
  },
  {
    productId: 17, // Chocolate Sublime 72g
    imageUrl:
      'https://static.mercadonegro.pe/wp-content/uploads/2020/05/13123134/chocola-sublime-sonrisa.jpg',
  },
  {
    productId: 1,
    imageUrl:
      'https://chalosgrocery.com/assets/uploads/3114244c9e262162560f0655b45e12c4.jpg',
  },
];

export const seedProductImages = async (db: Db) => {
  await db.insert(productImages).values(productImagesInitial);
};
