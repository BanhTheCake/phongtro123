import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private AppService: AppService) {}

  @Get('/insert')
  insertData() {
    return this.AppService.insertData();
  }
}
