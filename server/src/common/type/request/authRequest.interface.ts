import { Request } from 'express';
import { SafeUser } from '@/modules/user/type/user.type';

export interface AuthRequest extends Request {
  user: Partial<SafeUser>;
}
