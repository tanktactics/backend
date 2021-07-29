import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getStatus();
    const res: any = exception.getResponse();
    const error = res.error;
    const message = exception.message || res.message;

    response.status(code).json({
      timestamp: dayjs().format(),
      code,
      message,
      error,
    });
  }
}
