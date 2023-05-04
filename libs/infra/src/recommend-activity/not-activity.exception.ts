import {BadRequestException, HttpException} from '@nestjs/common';

export class NotActivityException extends BadRequestException {

  constructor(response: string | Record<string, any>) {
    super(response);
  }
}
