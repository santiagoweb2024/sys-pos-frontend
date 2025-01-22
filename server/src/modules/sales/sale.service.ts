import { Injectable, NotFoundException } from '@nestjs/common';
import { GetSaleQueryDto } from './dto/getSale.dto';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './dto/createSale.dto';
import { AddProductToSaleDto } from './dto/addProductToSale.dto';
import { SaleDetailInsert } from '@/shared/types/database/entities/saleDetail.types';
import Decimal from 'decimal.js-light';
import { UpdateSaleDetailDto } from './dto/updateSaleDetail.dto';
import { ProductRepository } from '../products/product.repository';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getAllSales(query: GetSaleQueryDto) {
    const { status, ...paginationQuery } = query;
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);
    const { salesItems, totalSalesCount } =
      await this.saleRepository.getAllSales({
        limit,
        offset,
        filter: { status },
      });

    return {
      items: salesItems,
      meta: PaginationHelper.createMeta({
        totalItems: totalSalesCount,
        itemCount: salesItems.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalSalesCount / limit),
        currentPage: Math.floor(offset / limit) + 1,
        path: 'sales',
        query: { status },
      }),
    };
  }

  async getSaleById(saleId: number) {
    const sale = await this.saleRepository.getSaleById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }
    return sale;
  }

  async getSaleWithDetails(saleId: number) {
    const sale = await this.saleRepository.getSaleWithDetails(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }
    return sale;
  }

  async createSale(data: CreateSaleDto) {
    return this.saleRepository.createSale(data);
  }

  async addProductToSale(saleId: number, data: AddProductToSaleDto) {
    const sale = await this.saleRepository.getSaleById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('No se puede agregar productos a una venta cerrada');
    }

    const product = await this.productRepository.findById(data.productId);

    const subTotal = new Decimal(data.quantity)
      .mul(new Decimal(product.salePrice))
      .toFixed(2);

    const saleDetailData: SaleDetailInsert = {
      saleId,
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: product.salePrice,
      subTotal,
    };

    return this.saleRepository.addProductToSale(saleDetailData);
  }

  async confirmSale(saleId: number, paymentMethodId: number) {
    const sale = await this.saleRepository.getSaleById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('La venta ya está cerrada');
    }

    return this.saleRepository.confirmSale({
      id: saleId,
      paymentMethodId,
      status: 'CLOSED',
    });
  }

  async removeProductFromSale(saleId: number, productId: number) {
    const sale = await this.saleRepository.getSaleById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('No se puede eliminar productos de una venta cerrada');
    }

    return this.saleRepository.removeProductFromSale({
      saleId,
      productId,
    });
  }

  async updateProductInSale(
    saleId: number,
    detailId: number,
    data: UpdateSaleDetailDto,
  ) {
    const sale = await this.saleRepository.getSaleById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('No se puede actualizar productos de una venta cerrada');
    }

    const currentDetail = await this.saleRepository.getSaleDetailById(detailId);
    //verificar si el detalle no exite
    if (!currentDetail) {
      throw new NotFoundException(`Detalle con ID ${detailId} no encontrado`);
    }

    // Verificar si el detalle existe pero no pertenece a la venta
    if (currentDetail.saleId !== saleId) {
      throw new Error(
        `El detalle ${detailId} pertenece a la venta ${currentDetail.saleId}, no a la venta ${saleId}`,
      );
    }

    // Verificar si el producto existe y no está eliminado
    const product = await this.productRepository.findById(
      currentDetail.productId,
    );
    if (!product) {
      throw new Error('El producto ya no está disponible');
    }

    // Verificar si hay suficiente stock
    if (product.stock < data.quantity) {
      throw new Error(`Stock insuficiente. Stock disponible: ${product.stock}`);
    }

    const subTotal = new Decimal(data.quantity)
      .mul(currentDetail.unitPrice)
      .toFixed(2);

    return this.saleRepository.updateProductInSale(
      {
        id: detailId,
        quantity: data.quantity,
      },
      subTotal,
    );
  }
}
