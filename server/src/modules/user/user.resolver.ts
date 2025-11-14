import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/common/guard/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '@/common/decorator/currentUser.decorator';
import { UserResponse } from '@/modules/user/type/response/user.response';
import { ExistingUsernameResponse } from '@/modules/user/type/response/existingUsername.response';
import { UsernameInput } from '@/modules/user/type/input/username.input';
import { UpdateUserProfileInput } from '@/modules/user/type/input/updateUserProfile.input';
import { UpdateUserProfileResponse } from '@/modules/user/type/response/updateUserProfile.response';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ExistingUsernameResponse)
  async verifyUsername(
    @Args('input') input: UsernameInput,
  ): Promise<ExistingUsernameResponse> {
    return this.userService.verifyUsername(input.username);
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async currentUserProfile(
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UserResponse> {
    const user: User = await this.userService.getCurrentUser(currentUser);
    return this.userService.generateUserResponse(user);
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async otherUserProfile(
    @Args('username') username: string,
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UserResponse> {
    const user: User = await this.userService.getOtherUserProfile(
      username,
      currentUser,
    );
    return this.userService.generateUserResponse(user);
  }

  @Mutation(() => UpdateUserProfileResponse)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,

    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UpdateUserProfileResponse> {
    return this.userService.updateUserProfile(
      currentUser as User,
      updateUserProfileInput,
    );
  }
}
