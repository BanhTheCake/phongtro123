import { PostModule } from './Post/Post.module';
import { AppService } from './app.service';
import { ModelModule } from './Models/Model.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/Auth.module';
import { DatabaseModule } from './Database/Database.module';
import { AppController } from './app.controller';
import { CategoryModule } from './Category/Category.module';
import { PriceModule } from './Price/price.module';
import { AreaModule } from './Area/Area.module';
import { ProvinceModule } from './Province/Province.module';
import { UserModule } from './User/user.module';
import { ImageModule } from './Image/Image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    ModelModule,
    CategoryModule,
    PostModule,
    PriceModule,
    AreaModule,
    ProvinceModule,
    UserModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
