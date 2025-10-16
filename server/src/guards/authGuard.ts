import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateContext } from '@/context/types/createContext.type';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgByIndex(2) as CreateContext;

    if (ctx.user?.id) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
