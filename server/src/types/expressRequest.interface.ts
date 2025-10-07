import { Request } from 'express';
import { SafeUser } from '@/user/types/user.type';

export interface AuthRequest extends Request {
  user: Partial<SafeUser>;
}
