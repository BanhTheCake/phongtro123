import { ProvinceService } from './../services/Province.service';
import { Controller, Get } from '@nestjs/common';

@Controller('province')
export class ProvinceController {
  constructor(private ProvinceService: ProvinceService) {}

  @Get('test')
  getHello() {
    return this.ProvinceService.getHello();
  }

  @Get('all')
  getAllProvinces() {
    return this.ProvinceService.getAllProvinces();
  }
}
