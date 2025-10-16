import { User } from '@prisma/client';

export interface CreateContext {
  user?: User;
  token?: string;
}