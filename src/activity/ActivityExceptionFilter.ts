import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {NotActivityException} from "./exception/NotActivityException";

@Catch(NotActivityException)
export class ActivityExceptionFilter implements ExceptionFilter {

  catch(exception: NotActivityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .json({
        message: exception,
      });
  }
}