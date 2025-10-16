import { Request } from 'express';
import { SafeUser } from '@/modules/user/types/user.type';

export interface AuthRequest extends Request {
  user: Partial<SafeUser>;
}
