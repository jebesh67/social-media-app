import { User } from '@prisma/client';
import { MyJwtPayload } from '@/jwt/type/myJwtPayload.interface';
import { AuthRequest } from '@/types/expressRequest.interface';
import { ContextType } from '@/context/types/context.type';
import { decodeFromToken, extractToken } from '@/jwt/helper/jwt.helper';
import { getUserById } from '@/context/helper/context.helper';

export const Context = async ({
  req,
}: {
  req: AuthRequest;
}): Promise<ContextType> => {
  const authHeader: string = req.headers.authorization || '';

  const token: string | undefined = extractToken(authHeader);

  let user: User | undefined;

  if (token) {
    try {
      const decoded: MyJwtPayload = decodeFromToken(token);
      user = await getUserById(decoded.id);
    } catch (err) {
      user = undefined;
    }
  }

  return {
    user,
    token,
  };
};
