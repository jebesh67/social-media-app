import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { CacheService } from '@/common/cache/cache.service';
import { CacheModule } from '@/common/cache/cache.module';
import { GraphQLModule } from '@nestjs/graphql';
import { createGraphQLContext } from '@/common/context/createGraphQLContext';
import { AuthRequest } from '@/common/types/request/authRequest.interface';
import { GraphQLConfig } from '@/common/graphql/graphql.config';
import { ContextType } from '@/common/context/type/context.type';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CacheModule,
    GraphQLModule.forRoot({
      ...GraphQLConfig,
      context: ({ req }: { req: AuthRequest }): Promise<ContextType> =>
        createGraphQLContext({ req }),
    }),
  ],
  providers: [CacheService],
})
export class AppModule {}
