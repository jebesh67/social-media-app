import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/common/guard/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '@/modules/user/decorator/currentUser.decorator';
import { CreateUserInput } from '@/modules/user/types/inputs/createUser.input';
import { LoginUserInput } from '@/modules/user/types/inputs/loginUser.input';
import { OtherUserResponse } from '@/modules/user/types/response/otherUser.response';
import { UserResponse } from '@/modules/user/types/response/user.response';
import { ExistingUsernameResponse } from '@/modules/user/types/response/existingUsername.response';
import { UsernameInput } from '@/modules/user/types/inputs/username.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ExistingUsernameResponse)
  async verifyUsername(
    @Args('input') input: UsernameInput,
  ): Promise<ExistingUsernameResponse> {
    return this.userService.verifyUsername(input.username);
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<UserResponse> {
    const createdUser: User =
      await this.userService.createUser(createUserInput);
    return this.userService.generateUserResponse(createdUser);
  }

  @Query(() => UserResponse)
  async loginUser(
    @Args('loginUserInput', { type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<UserResponse> {
    const user: User = await this.userService.loginUser(loginUserInput);
    return this.userService.generateUserResponse(user);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async logoutUser(): Promise<boolean> {
    await this.userService.logoutUser();
    return true;
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async currentUser(
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<UserResponse> {
    const user: User = await this.userService.getCurrentUser(currentUser);
    return this.userService.generateUserResponse(user);
  }

  @Query(() => OtherUserResponse)
  @UseGuards(AuthGuard)
  async otherUserProfile(
    @Args('username') username: string,
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<OtherUserResponse> {
    const user: User = await this.userService.getOtherUserProfile(
      username,
      currentUser,
    );
    return this.userService.generateOtherUserResponse(user);
  }
}
