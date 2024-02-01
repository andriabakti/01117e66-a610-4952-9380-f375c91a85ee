import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisDto } from './dto/user-regis.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userSvc: UserService) {}

  @Post('sign-up')
  public async signUp(@Body() regisDto: Readonly<UserRegisDto>) {
    return await this.userSvc.register(regisDto);
  }

  @Post('sign-in')
  public async signIn(@Body() loginDto: Readonly<UserLoginDto>) {
    return await this.userSvc.login(loginDto);
  }
}
