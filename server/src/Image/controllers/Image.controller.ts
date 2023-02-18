import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { ImageService } from '../services/Image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private ImageService: ImageService) {}

  @Get('hello')
  hello() {
    return 'i am image controller';
  }

  //   @Post('upload')
  //   @UseInterceptors(FilesInterceptor('files'))
  //   uploadFile(
  //     @UploadedFiles() files: Array<Express.Multer.File>,
  //     @Body('id') id: string,
  //   ) {
  //     console.log(files);
  //     console.log(id);
  //     return 'ok';
  //   }
}
