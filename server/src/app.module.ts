import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { CacheService } from '@/common/cache/cache.service';
import { CacheModule } from '@/common/cache/cache.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Context } from '@/common/context/context';
import { AuthRequest } from '@/common/types/expressRequest.interface';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CacheModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      context: ({ req }: { req: AuthRequest }) => Context({ req }),
    }),
  ],
  providers: [CacheService],
})
export class AppModule {}
