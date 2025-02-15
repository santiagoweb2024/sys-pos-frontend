import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateBrandDto, QueryPaginationWithSearchDto } from "../brand/brand.dto";
import { CategoryService } from "./category.service";

@Controller('category')
export class BrandController {
    constructor (private readonly categoriesService: CategoryService) {}
    @Post()
    async createCategory(@Body() data: CreateBrandDto) {
      const brand = await this.categoriesService.createCategory(data);
      return {
        type: 'brand',
        data: brand,
      };
    }
  
    @Get()
    async getAllCategories(@Query() query: QueryPaginationWithSearchDto)  {
      const {categoryList, meta} = await this.categoriesService.getAllCategory(query);
      return {
        type: 'category',
        data: categoryList,
        meta  
      }    
    }
}