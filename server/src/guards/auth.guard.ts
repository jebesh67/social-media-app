import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from '@/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: AuthRequest = context
      .switchToHttp()
      .getRequest<AuthRequest>();

    if (request.user.id) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
