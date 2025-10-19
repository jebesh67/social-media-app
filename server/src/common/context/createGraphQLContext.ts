import { User } from '@prisma/client';
import { MyJwtPayload } from '@/common/jwt/type/myJwtPayload.interface';
import { AuthRequest } from '@/common/types/expressRequest.interface';
import { ContextType } from '@/common/context/type/context.type';
import { decodeFromToken, extractToken } from '@/common/jwt/util/jwt.util';
import { getUserById } from '@/common/context/helper/context.helper';

export const createGraphQLContext = async ({
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
