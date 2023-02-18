import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  maxAge: 1000 * 60 * 60 * 24 * 7, // milliseconds,
};
