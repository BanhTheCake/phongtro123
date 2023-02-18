import { Controller, Get } from '@nestjs/common';
import { PriceService } from '../services/price.service';

@Controller('price')
export class PriceController {
  constructor(private PriceService: PriceService) {}

  @Get('test')
  getHello() {
    return this.PriceService.getHello();
  }

  @Get()
  getAllPrice() {
    return this.PriceService.getAllPrice();
  }
}
