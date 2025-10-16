import { PrismaClient, User } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { MyJwtPayload } from '@/types/myJwtPayload.interface';
import { AuthRequest } from '@/types/expressRequest.interface';
import { CreateContext } from '@/context/types/createContext.type';

const prisma = new PrismaClient();

export const createContext = async ({
  req,
}: {
  req: AuthRequest;
}): Promise<CreateContext> => {
  const authHeader: string = req.headers.authorization || '';
  const token: string | undefined = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : undefined;
  let user: User | undefined;

  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
      user =
        (await prisma.user.findUnique({
          where: { id: decoded.id },
        })) || undefined;
    } catch (err) {
      user = undefined;
    }
  }

  return {
    user,
    token,
  };
};
