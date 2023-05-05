import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {LoginExpiredException} from '../login-expired.exception';
import {NotActivityException} from '../../../activity/exception/not-activity.exception';

@Catch(LoginExpiredException)
export class LoginExpiredExceptionFilter implements ExceptionFilter {

  catch(exception: NotActivityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus());

    response
      .json({
        message: exception,
      });
  }
}
