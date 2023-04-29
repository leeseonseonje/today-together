import {ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException} from '@nestjs/common';
import {Response} from 'express';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.statusCode = 500;

    response
      .json({
        message: '일시적인 오류입니다. 다시 시도해 주세요.',
      });
  }

}
