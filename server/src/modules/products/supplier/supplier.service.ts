import { PaginationHelper } from '@/common/helpers/pagination.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import {CreateSupplierDto, QueryPaginationWithSearchDto, UpdateSupplierDto} from './supplier.dto'
@Injectable()
export class SupplierService {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    async createSupplier(data: CreateSupplierDto) {
        const existingBrand = await this.supplierRepository.findByname(data.name);
        if (existingBrand) {
          throw new BadRequestException('La marca ya existe');
        }
        const brand = await this.supplierRepository.createSupplier(data);
        return brand;
      }
    
      async getAllSuppliers(query: QueryPaginationWithSearchDto) {
        const { search: name, ...queryPagintaion } = query;
        const { limit, offset, page } =
          PaginationHelper.generatePaginationParams(queryPagintaion);
        
          // Obtén los datos de la marca
        const { supplierList, totalSuppliers } =
          await this.supplierRepository.getAllSuppliers(limit, offset, name);
    
        // Crea los metadatos de paginación
        const paginationMeta = PaginationHelper.getPaginationMeta(
          totalSuppliers,
          page,
          limit,
          supplierList.length,
        );
    
        return {
          supplierList,
          meta: paginationMeta,
        };
      }

      async updateSupplier(id:number,data:UpdateSupplierDto): Promise<void>{
        const existingSupplier = await this.supplierRepository.findById(id);
        if (!existingSupplier) {
          throw new BadRequestException('La marca no existe');
        }
        await this.supplierRepository.updateBrand(id,data);
      }
      
      async deleteSoftSupplier(id: number): Promise<void> {
        const existingSupplier = await this.supplierRepository.findById(id);
        if (!existingSupplier) {
          throw new BadRequestException('La marca no existe');
        }
        await this.supplierRepository.softDeleteSupplier(id);
      }
}