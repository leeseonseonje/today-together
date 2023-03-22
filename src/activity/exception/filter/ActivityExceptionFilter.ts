import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {NotActivityException} from "../NotActivityException";

@Catch(NotActivityException)
export class ActivityExceptionFilter implements ExceptionFilter {

  catch(exception: NotActivityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.statusCode = 400;

    response
      .json({
        message: exception,
      });
  }
}
