import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken } from '../types/token.type';
import { Request } from 'express';

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

  async validate(req: Request, payload: RefreshToken) {
    const { refreshToken } = req.cookies;
    return { refreshToken };
  }
}
