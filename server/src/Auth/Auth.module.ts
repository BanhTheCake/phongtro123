import { ModelModule } from './../Models/Model.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/Auth.controller';
import { AuthService } from './services/Auth.service';
import { tokenService } from './services/Jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    tokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
