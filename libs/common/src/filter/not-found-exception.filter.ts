import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException
} from '@nestjs/common';
import {Response} from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    response.statusCode = 404;

    response
      .json({
        message: '잘못된 URL 입니다. URL을 확인해 주세요.',
        exception: exception
      });
  }

}
