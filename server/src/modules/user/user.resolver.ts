import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '@/decorator/currentUser.decorator';
import { CreateUserInput } from '@/modules/user/types/inputs/createUser.input';
import { LoginUserInput } from '@/modules/user/types/inputs/loginUser.input';
import { OtherUserResponse } from '@/modules/user/types/response/otherUser.response';
import { UserResponse } from '@/modules/user/types/response/user.response';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserResponse> {
    const createdUser: User =
      await this.userService.createUser(createUserInput);
    return this.userService.generateUserResponse(createdUser);
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<UserResponse> {
    const user: User = await this.userService.loginUser(loginUserInput);
    return this.userService.generateUserResponse(user);
  }

  @Mutation(() => Boolean)
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
