import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../services/Category.service';

@Controller('category')
export class CategoryController {
  constructor(private CategoryService: CategoryService) {}

  @Get('/all-slugs')
  getAllSlugs() {
    return this.CategoryService.getAllSlugs();
  }
}
