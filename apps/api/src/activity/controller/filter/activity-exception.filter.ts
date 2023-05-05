import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {NotActivityException} from 'lib/infra/recommend-activity/not-activity.exception';

@Catch(NotActivityException)
export class ActivityExceptionFilter implements ExceptionFilter {

  catch(exception: NotActivityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    response.statusCode = 400;

    response
      .json({
        message: exception.message,
        exception: exception
      });
  }
}
