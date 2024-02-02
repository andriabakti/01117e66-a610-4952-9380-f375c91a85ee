import { UserService } from '@/server/modules/users/user.service';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtSvc: JwtService,
    private readonly userSvc: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const reqAuth: string = req.headers?.authorization;
    if (!reqAuth) {
      throw new BadRequestException('Token is Required!');
    } else {
      const tokenArr = reqAuth.split(' ');
      if (tokenArr[0] != 'Bearer' || tokenArr.length < 2) {
        throw new UnauthorizedException('Token is Not Valid!');
      }

      let decoded: { email: string; iat: number; exp: number };
      try {
        decoded = await this.jwtSvc.verifyAsync(tokenArr[1]);
      } catch (err) {
        const errMsg =
          err.message == 'TokenExpiredError'
            ? 'Token is Expired!'
            : err.message;
        throw new UnauthorizedException(errMsg);
      }

      const existUser: { id: string } = await this.userSvc.findByEmail(
        decoded.email,
      );
      if (!existUser) throw new NotFoundException('User is Not Exist!');
      req['user'] = existUser;

      next();
    }
  }
}
