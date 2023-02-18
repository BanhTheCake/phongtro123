import { Controller, Get } from '@nestjs/common';
import { AreaService } from '../services/area.sevice';

@Controller('area')
export class AreaController {
  constructor(private AreaService: AreaService) {}

  @Get('test')
  getHello() {
    return this.AreaService.getHello();
  }

  @Get()
  getAllAreas() {
    return this.AreaService.getAllAreas();
  }
}
