import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { IOtherUserResponse, IUserResponse } from '@/user/types/user.interface';
import { AuthGuard } from '@/guards/auth.guard';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { CurrentUser } from '@/decorator/currentUser.decorator';
import { SafeUser } from '@/user/types/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const createdUser: User = await this.userService.createUser(createUserDto);

    return await this.userService.generateUserResponse(createdUser);
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user: User = await this.userService.loginUser(loginUserDto);

    return await this.userService.generateUserResponse(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logoutUser(@Res() res: Response) {
    await this.userService.logoutUser();
    return res.status(HttpStatus.OK).json({ message: 'User logged out' });
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<IUserResponse> {
    const user: User = await this.userService.getCurrentUser(currentUser);
    return this.userService.generateUserResponse(user);
  }

  @Get('get/:username')
  @UseGuards(AuthGuard)
  async getOtherUserProfile(
    @Param('username') username: string,
    @CurrentUser() currentUser: Partial<User>,
  ): Promise<IOtherUserResponse> {
    const user: User = await this.userService.getOtherUserProfile(
      username,
      currentUser,
    );

    return await this.userService.generateOtherUserResponse(user);
  }
}
