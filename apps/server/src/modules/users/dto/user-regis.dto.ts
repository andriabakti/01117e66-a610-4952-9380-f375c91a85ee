import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
