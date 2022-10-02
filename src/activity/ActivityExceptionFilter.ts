import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from 'express';

@Catch(BadRequestException)
export class ActivityExceptionFilter implements ExceptionFilter {

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response.status(status)
            .json({
                message: exception,
            });
    }
}