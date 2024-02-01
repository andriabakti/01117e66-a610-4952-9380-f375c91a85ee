import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { UserData } from '@server/commons/decorators/user-data.decorator';
import { IntParserPipe } from '@server/commons/pipes/int-parser.pipe';
import { isURL } from 'class-validator';
import { UrlShortenerDto } from './dto/url-shortener.dto';
import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
  constructor(private readonly linkSvc: LinkService) {}

  @Post('shorten')
  public async shorten(
    @UserData() userData: { id: string },
    @Body() shortenPaylod: UrlShortenerDto,
  ) {
    if (!isURL(shortenPaylod.originalUrl)) {
      throw new BadRequestException('URL is Not Valid!');
    }
    return await this.linkSvc.createShortLink(
      userData.id,
      shortenPaylod.originalUrl,
    );
  }

  @Get('list')
  public async list(
    @UserData() requester: { id: string },
    @Query('limit', new IntParserPipe()) limit: number,
    @Query('skip', new IntParserPipe()) skip: number,
  ) {
    return await this.linkSvc.getLinkList(requester.id, limit, skip);
  }
}
