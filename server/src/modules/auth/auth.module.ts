import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from '@/modules/auth/auth.resolver';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
