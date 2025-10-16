import { Resolver, Query } from '@nestjs/graphql';
import { UserResponse } from '@/modules/user/types/response/user.response';
import { UserService } from '@/modules/user/user.service';
import { AuthGuard } from '@/guards/authGuard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async getCurrentUser() {
    return {
      user: {
        name: 'jebesh',
        id: '11',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}
