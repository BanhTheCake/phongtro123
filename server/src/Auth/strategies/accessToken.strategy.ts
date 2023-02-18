import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessToken } from '../types/token.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'AccessToken',
) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get('ACCESS_KEY'),
    });
  }

  async validate(payload: AccessToken) {
    return { id: payload.id, name: payload.name };
  }
}
