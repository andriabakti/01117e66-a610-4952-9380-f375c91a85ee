import { DatabaseService } from '@/server/configs/database/database.service';
import { RedisService } from '@/server/configs/redis/redis.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ICachedUrl } from './interfaces/cached-url.interface';

@Injectable()
export class LinkService {
  private baseUrl: string;
  constructor(
    private readonly db: DatabaseService,
    private readonly redisSvc: RedisService,
  ) {
    this.baseUrl = process.env.BASE_URL;
  }

  private async genUrlCode(codeLength = 6) {
    const urlCode = nanoid(codeLength);
    const exist = await this.db.link.findUnique({
      where: {
        uniqueCode: urlCode,
      },
    });
    if (exist) return this.genUrlCode(codeLength + 1);

    return urlCode;
  }

  public async createShortLink(userId: string, originalUrl: string) {
    const urlCode = await this.genUrlCode();
    const shortenedUrl = `${this.baseUrl}/${urlCode}`;

    return await this.db.link.create({
      data: {
        uniqueCode: urlCode,
        longUrl: originalUrl,
        shortUrl: shortenedUrl,
        userId: userId,
      },
      select: {
        shortUrl: true,
      },
    });
  }

  private async saveInRedis(urlCode: string, originalUrl: string) {
    const cacheKey = `cached-url-${urlCode}`;
    const urlData: ICachedUrl = {
      cachedAt: new Date(),
      longUrl: originalUrl,
    };

    return await this.redisSvc.setCache(cacheKey, JSON.stringify(urlData));
  }

  private async findInRedis(urlCode: string) {
    const cacheKey = `cached-url-${urlCode}`;
    const cacheResult = await this.redisSvc.getCache(cacheKey);
    if (!cacheResult) return null;

    const cachedUrlData: ICachedUrl = JSON.parse(cacheResult as string);
    return cachedUrlData;
  }

  public async getOriginalLink(code: string) {
    const cached = await this.findInRedis(code);
    if (cached) return cached.longUrl;
    const exist = await this.db.link.findUnique({
      where: {
        uniqueCode: code,
      },
      select: {
        longUrl: true,
      },
    });
    if (!exist) throw new NotFoundException('Link is Not Exist!');

    return exist.longUrl;
  }

  public async updateVisitCount(urlCode: string) {
    const result = await this.db.link.findUnique({
      where: {
        uniqueCode: urlCode,
      },
      select: {
        visitCount: true,
      },
    });
    if (!result) throw new NotFoundException('Link is Not result!');

    try {
      const updateResult = await this.db.link.update({
        where: {
          uniqueCode: urlCode,
        },
        data: {
          visitCount: result.visitCount + 1,
        },
        select: {
          id: true,
          longUrl: true,
          visitCount: true,
        },
      });

      const isCached = await this.findInRedis(urlCode);
      if (!isCached && updateResult.visitCount >= 5) {
        await this.saveInRedis(urlCode, updateResult.longUrl);
      }

      return {
        id: updateResult.id,
        visitCount: updateResult.visitCount,
      };
    } catch (err: any) {
      console.log(err, `< error update link: ${urlCode} visit count`);
      throw new InternalServerErrorException(err.message);
    }
  }

  public async getLinkList(userId: string, limit: number, offset: number) {
    const links = await this.db.link.findMany({
      where: {
        userId: userId,
      },
      take: limit ? limit : 10,
      skip: offset ? offset : 0,
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        userId: false,
      },
    });

    // get total
    const total = await this.db.link.count({
      where: {
        userId: userId,
      },
    });

    return { links, count: links.length, total };
  }
}
