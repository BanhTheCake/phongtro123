import { Module } from '@nestjs/common';
import { AreaController } from './controllers/area.controller';
import { AreaService } from './services/area.sevice';

@Module({
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
