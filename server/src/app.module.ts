import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache/cache.service';
import { CacheModule } from '@/cache/cache.module';

@Module({
  imports: [PrismaModule, UserModule, CacheModule],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
