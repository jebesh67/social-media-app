import { User } from '@prisma/client';

export interface ContextType {
  user?: User;
  token?: string;
}
