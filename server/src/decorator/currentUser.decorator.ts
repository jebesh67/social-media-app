import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@/types/expressRequest.interface';
import { SafeUser } from '@/modules/user/types/user.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Partial<SafeUser> => {
    const request: AuthRequest = context.switchToHttp().getRequest();
    return request.user;
  },
);
