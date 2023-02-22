import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { RefreshToken } from '../types/token.type';
import { Request } from 'express';
import { User } from 'Models/Entity/users.model';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'RefreshToken',
) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.getTokenFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get('REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  static getTokenFromCookies(req: Request) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return refreshToken;
  }

  async validate(req: Request) {
    const { refreshToken } = req.cookies;
    return { refreshToken };
  }
}
