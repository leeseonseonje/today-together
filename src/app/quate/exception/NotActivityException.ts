import {HttpException} from '@nestjs/common';

export class NotQuoteException extends HttpException {

  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
  }
}
