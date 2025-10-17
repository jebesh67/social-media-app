import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ContextType } from '@/common/context/types/context.type';
import { BackendError } from '@/common/backend-error/util/backendError.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgByIndex(2) as ContextType;

    if (ctx.user?.id) {
      return true;
    }

    throw BackendError.Unauthorized('Unauthorized');
  }
}
