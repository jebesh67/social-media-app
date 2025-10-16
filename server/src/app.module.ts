import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CacheService } from './cache/cache.service';
import { CacheModule } from '@/cache/cache.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { createContext } from '@/context/createContext';
import { AuthRequest } from '@/types/expressRequest.interface';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CacheModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      context: ({ req }: { req: AuthRequest }) => createContext({ req }),
    }),
  ],
  providers: [CacheService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
