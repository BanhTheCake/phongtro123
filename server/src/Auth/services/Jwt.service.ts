import { ConfigService } from '@nestjs/config';
import { AccessToken, RefreshToken } from './../types/token.type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class tokenService {
  constructor(
    private JwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(token: AccessToken) {
    return this.JwtService.sign(token, {
      secret: this.configService.get('ACCESS_KEY'),
      expiresIn: this.configService.get('ACCESS_EXPIRES'),
    });
  }

  generateRefreshToken(token: RefreshToken) {
    return this.JwtService.sign(token, {
      secret: this.configService.get('REFRESH_KEY'),
      expiresIn: this.configService.get('REFRESH_EXPIRES'),
    });
  }
}
