import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LinkService } from './modules/links/link.service';

@Controller()
export class AppController {
  constructor(
    private readonly appSvc: AppService,
    private readonly linkSvc: LinkService,
  ) {}

  @Get()
  getHello(): string {
    return this.appSvc.getHello();
  }

  @Get(':code')
  public async redirectLink(
    @Res() resp: Response,
    @Param('code') code: string,
  ) {
    if (!code) throw new BadRequestException(`Link is Required!`);
    const originalUrl = await this.linkSvc.getOriginalLink(code);
    resp.redirect(originalUrl);
    return await this.linkSvc.updateVisitCount(code);
  }
}
