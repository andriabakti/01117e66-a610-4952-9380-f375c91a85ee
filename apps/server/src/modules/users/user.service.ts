import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@server/configs/database/database.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisDto } from './dto/user-regis.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtSvc: JwtService,
  ) {}

  public async findByEmail(email: string) {
    return await this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async register(regisDto: UserRegisDto) {
    const exist = await this.findByEmail(regisDto.email);
    if (exist) throw new BadRequestException('Email is Already Registered!');

    const passwordSalt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(regisDto.password, passwordSalt);
    const newUser = await this.db.user.create({
      data: {
        username: regisDto.username,
        password: hashPassword,
        email: regisDto.email,
      },
    });

    const token = this.jwtSvc.sign({ email: newUser.email });
    return {
      accessToken: token,
    };
  }

  public async login(loginDto: UserLoginDto) {
    const exist: { password: string } = await this.findByEmail(loginDto.email);
    if (!exist) throw new NotFoundException('User is Not Exist!');
    const isValid = bcrypt.compareSync(loginDto.password, exist.password);
    if (!isValid) throw new BadRequestException('Password is Not Valid!');

    const token = this.jwtSvc.sign({ email: loginDto.email });
    return {
      accessToken: token,
    };
  }
}
