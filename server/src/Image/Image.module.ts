import { Module } from '@nestjs/common';
import { ImageController } from './controllers/Image.controller';
import { ImageService } from './services/Image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
