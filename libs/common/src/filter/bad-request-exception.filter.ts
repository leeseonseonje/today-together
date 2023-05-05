import {
  ArgumentsHost, BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import {Response} from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    response.statusCode = 400;

    response
      .json({
        message: '잘못된 요청입니다.',
        exception: exception
      });
  }

}
