import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthRequest } from '@/types/expressRequest.interface';
import { User } from '@prisma/client';
import { MyJwtPayload } from '@/types/myJwtPayload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(
    req: AuthRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.headers.authorization) {
      req.user = {};
      next();
      return;
    }

    const token: string = req.headers.authorization.split('Bearer ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
      const user: User | null = await this.prisma.user.findUnique({
        where: {
          id: decode.id,
        },
      });

      if (user) {
        const { password, ...safeUser }: User = user;
        req.user = safeUser;
      } else {
        req.user = {};
      }

      next();
    } catch (error) {
      req.user = {};
      next();
    }
  }
}
