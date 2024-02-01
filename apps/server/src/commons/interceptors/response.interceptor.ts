import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponseData<T> {
  statusCode: number;
  error: string;
  message: string;
  result: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result: any) => {
        let untransform: any;
        if (typeof result == 'object') {
          untransform = result.untransform;
          delete result.untransform;
        }
        if (untransform) {
          return result;
        } else {
          return {
            statusCode: statusCode,
            error: null,
            message: this.getStatusMsg(statusCode),
            result: result,
          };
        }
      }),
    );
  }

  getStatusMsg(statusCode: number): string {
    let statusMessage = 'OK';
    switch (statusCode) {
      case HttpStatus.CREATED:
        statusMessage = 'Created';
        break;
    }
    return statusMessage;
  }
}
