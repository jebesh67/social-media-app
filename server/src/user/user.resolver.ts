import { Resolver, Query } from '@nestjs/graphql';
import { UserResponse } from '@/user/types/response/user.response';
import { UserService } from '@/user/user.service';
import { AuthGuard } from '@/guards/auth.guard';
import { UseMiddleware } from 'type-graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResponse)
  @UseMiddleware(AuthGuard)
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
