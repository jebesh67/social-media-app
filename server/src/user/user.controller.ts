import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { IUserResponse } from '@/user/types/user.interface';
import { AuthGuard } from '@/guards/auth.guard';
import { LoginUserDto } from '@/user/dto/login-user.dto';

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

  @Get('login')
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

  @Get('get/:username')
  @UseGuards(AuthGuard)
  async getUserProfile(
    @Param('username') username: string,
  ): Promise<IUserResponse> {
    const user: User = await this.userService.getUserProfile(username);

    return await this.userService.generateUserResponse(user);
  }
}
