import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errData: any = exception.getResponse();
    const statusCode = exception.getStatus();

    if (statusCode === 429) {
      return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: statusCode,
        error: errData,
        message: errData.split(':')[1],
        result: null,
      });
    }

    if (typeof errData == 'object') {
      return response.status(errData.statusCode).json({
        statusCode: statusCode,
        error: errData.error,
        message: errData.message,
        result: null,
      });
    } else {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: errData,
        result: null,
      });
    }
  }
}
