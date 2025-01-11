import { Injectable, NotFoundException } from '@nestjs/common';
import { GetSaleQueryDto } from './dto/getSale.dto';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './dto/createSale.dto';
import { AddProductToSaleDto } from './dto/addProductToSale.dto';
import { ConfirmSaleDto } from './dto/confirmSale.dto';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async getAllSales(query: GetSaleQueryDto) {
    const { status, ...paginationQuery } = query;
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);
    const { salesItems, totalSalesCount } = await this.saleRepository.findAll({
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

  async createSale(data: CreateSaleDto) {
    return this.saleRepository.create(data);
  }

  async getSaleWithDetails(saleId: number) {
    const sale = await this.saleRepository.findByIdWithDetails(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }
    return sale;
  }

  async addProductToSale(saleId: number, data: AddProductToSaleDto) {
    const sale = await this.saleRepository.findById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('No se puede agregar productos a una venta cerrada');
    }

    return this.saleRepository.addProductToSale(saleId, data);
  }

  async confirmSale(saleId: number, data: ConfirmSaleDto) {
    const sale = await this.saleRepository.findById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
    }

    if (sale.status === 'CLOSED') {
      throw new Error('La venta ya está cerrada');
    }

    return this.saleRepository.confirmSale(saleId, data);
  }
}
