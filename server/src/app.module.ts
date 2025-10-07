import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
