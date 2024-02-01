import { IsNotEmpty, IsString } from 'class-validator';

export class UrlShortenerDto {
  @IsNotEmpty()
  @IsString()
  readonly originalUrl: string;
}
