import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';
import {NotQuoteException} from "../NotActivityException";

@Catch(NotQuoteException)
export class ActivityExceptionFilter implements ExceptionFilter {

  catch(exception: NotQuoteException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.statusCode = 400;

    response
      .json({
        message: exception,
      });
  }
}
