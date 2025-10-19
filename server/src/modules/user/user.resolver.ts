import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/common/guard/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '@/modules/user/decorator/currentUser.decorator';
import { CreateUserInput } from '@/modules/user/types/inputs/createUser.input';
import { LoginUserInput } from '@/modules/user/types/inputs/loginUser.input';
import { UserResponse } from '@/modules/user/types/response/user.response';
import { AuthUserResponse } from '@/modules/user/types/response/authUser.response';
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

  @Mutation(() => AuthUserResponse)
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<AuthUserResponse> {
    const createdUser: User =
      await this.userService.createUser(createUserInput);
    return this.userService.generateAuthUserResponse(createdUser);
  }

  @Mutation(() => AuthUserResponse)
  async loginUser(
    @Args('loginUserInput', { type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<AuthUserResponse> {
    const user: User = await this.userService.loginUser(loginUserInput);
    return this.userService.generateAuthUserResponse(user);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async logoutUser(): Promise<boolean> {
    await this.userService.logoutUser();
    return true;
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
}
