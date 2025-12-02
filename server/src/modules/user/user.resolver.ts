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
import { UpdateUserResponse } from '@/modules/user/type/response/updateUser.response';
import { UpdateUsernameInput } from '@/modules/user/type/input/updateUsername.input';

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
    const user: User = await this.userService.getCurrentUser(
      currentUser as User,
    );
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
      currentUser as User,
    );
    return this.userService.generateUserResponse(user);
  }

  @Mutation(() => UpdateUserResponse)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,

    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UpdateUserResponse> {
    const updatedUser: User = await this.userService.updateUserProfile(
      currentUser as User,
      updateUserProfileInput,
    );
    return this.userService.generateUpdateUserResponse(
      updatedUser,
      'Profile updated successfully',
    );
  }

  @Mutation(() => UpdateUserResponse)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUsername(
    @Args('updateUsernameInput') input: UpdateUsernameInput,
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UpdateUserResponse> {
    const updatedUser: User = await this.userService.updateUsername(
      input,
      currentUser as User,
    );
    return this.userService.generateUpdateUserResponse(
      updatedUser,
      'Username updated successfully',
    );
  }
}
