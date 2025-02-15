import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import {
  QueryPaginationWithSearchDto,
  UpdateCategoryDto,
} from './category.dto';
import { PaginationHelper } from '@/common/helpers/pagination.helper';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(data: any) {
    const existingBrand = await this.categoryRepository.findByname(data.name);
    if (existingBrand) {
      throw new BadRequestException('La categoria ya existe');
    }
    const brand = await this.categoryRepository.createCategory(data);
    return brand;
  }

  async getAllCategory(query: QueryPaginationWithSearchDto) {
    const { search: name, ...queryPagintaion } = query;
    const { limit, offset, page } =
      PaginationHelper.generatePaginationParams(queryPagintaion);

    // Obtén los datos de la marca
    const { categoryList, totalCategories } =
      await this.categoryRepository.getAllcategories(limit, offset, name);

    // Crea los metadatos de paginación
    const paginationMeta = PaginationHelper.getPaginationMeta(
      totalCategories,
      page,
      limit,
      categoryList.length,
    );

    return {
      categoryList,
      meta: paginationMeta,
    };
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<void> {
    const existingBrand = await this.categoryRepository.findById(id);
    if (!existingBrand) {
      throw new BadRequestException('La categoria no existe');
    }
    await this.categoryRepository.updateCategory(id, data);
  }

  async deleteSoftCategory(id: number): Promise<void> {
    const existingBrand = await this.categoryRepository.findById(id);
    if (!existingBrand) {
      throw new BadRequestException('La categoria no existe');
    }
    await this.categoryRepository.softDeleteCategory(id);
  }
}
