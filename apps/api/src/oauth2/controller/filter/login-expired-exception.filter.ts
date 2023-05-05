import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {LoginExpiredException} from 'lib/infra/oauth2/exception/login-expired.exception';

@Catch(LoginExpiredException)
export class LoginExpiredExceptionFilter implements ExceptionFilter {

  catch(exception: LoginExpiredException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus());

    response
      .json({
        message: exception,
      });
  }
}
