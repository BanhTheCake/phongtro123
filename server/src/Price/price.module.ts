import { PriceController } from './controllers/price.controller';
import { Module } from '@nestjs/common';
import { PriceService } from './services/price.service';

@Module({
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
