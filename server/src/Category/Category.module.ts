import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/Category.controller';
import { CategoryService } from './services/Category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
