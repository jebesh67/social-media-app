import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ContextType } from '@/context/types/context.type';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgByIndex(2) as ContextType;

    if (ctx.user?.id) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
