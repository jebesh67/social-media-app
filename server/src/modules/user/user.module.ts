import { Module } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { UserResolver } from '@/modules/user/user.resolver';

@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
