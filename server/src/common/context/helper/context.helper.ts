import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (id: string): Promise<User | undefined> => {
  return (
    (await prisma.user.findUnique({
      where: { id },
    })) || undefined
  );
};
