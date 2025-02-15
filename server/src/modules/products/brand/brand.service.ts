import { PaginationHelper } from '@/common/helpers/pagination.helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto, QueryPaginationWithSearchDto, UpdateBrandDto } from './brand.dto';
@Injectable()
export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) {}
    async createBrand(data: CreateBrandDto) {
        const existingBrand = await this.brandRepository.findByname(data.name);
        if (existingBrand) {
          throw new BadRequestException('La marca ya existe');
        }
        const brand = await this.brandRepository.createBrand(data);
        return brand;
      }
    
      async getAllBrands(query: QueryPaginationWithSearchDto) {
        const { search: name, ...queryPagintaion } = query;
        const { limit, offset, page } =
          PaginationHelper.generatePaginationParams(queryPagintaion);
        
          // Obtén los datos de la marca
        const { brandList, totalBrands } =
          await this.brandRepository.getAllBrands(limit, offset, name);
    
        // Crea los metadatos de paginación
        const paginationMeta = PaginationHelper.getPaginationMeta(
          totalBrands,
          page,
          limit,
          brandList.length,
        );
    
        return {
          brandList,
          meta: paginationMeta,
        };
      }

      async updateBrand(id:number,data:UpdateBrandDto): Promise<void>{
        const existingBrand = await this.brandRepository.findById(id);
        if (!existingBrand) {
          throw new BadRequestException('La marca no existe');
        }
        await this.brandRepository.updateBrand(id,data);
      }
      
      async deleteSoftBrand(id: number): Promise<void> {
        const existingBrand = await this.brandRepository.findById(id);
        if (!existingBrand) {
          throw new BadRequestException('La marca no existe');
        }
        await this.brandRepository.softDeleteBrand(id);
      }
}