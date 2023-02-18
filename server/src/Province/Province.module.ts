import { Module } from '@nestjs/common';
import { ProvinceController } from './controllers/Province.controller';
import { ProvinceService } from './services/Province.service';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
