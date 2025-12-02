import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/modules/auth/auth.service';
import { VerifyAccessResponse } from '@/modules/auth/type/response/verifyAccess.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/common/guard/auth.guard';
import { CurrentUser } from '@/common/decorator/currentUser.decorator';
import { User } from '@prisma/client';
import { AuthUserResponse } from '@/modules/auth/type/response/authUser.response';
import { CreateUserInput } from '@/modules/auth/type/input/createUser.input';
import { LoginUserInput } from '@/modules/auth/type/input/loginUser.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => VerifyAccessResponse)
  @UseGuards(AuthGuard)
  async verifyAccess(
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<VerifyAccessResponse> {
    return this.authService.verifyAccess(currentUser as User);
  }

  @Mutation(() => AuthUserResponse)
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<AuthUserResponse> {
    const createdUser: User =
      await this.authService.createUser(createUserInput);
    return this.authService.generateAuthUserResponse(createdUser);
  }

  @Mutation(() => AuthUserResponse)
  async loginUser(
    @Args('loginUserInput', { type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<AuthUserResponse> {
    const user: User = await this.authService.loginUser(loginUserInput);
    return this.authService.generateAuthUserResponse(user);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async logoutUser(): Promise<boolean> {
    await this.authService.logoutUser();
    return true;
  }
}
