import {BadRequestException, HttpException} from '@nestjs/common';

export class LoginExpiredException extends HttpException {


  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
  }
}
