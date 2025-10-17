import { verify } from 'jsonwebtoken';
import { MyJwtPayload } from '@/jwt/type/myJwtPayload.interface';

export const extractToken = (authHeader: string): string | undefined => {
  return authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : undefined;
};

export const decodeFromToken = (token: string): MyJwtPayload => {
  return verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
};
