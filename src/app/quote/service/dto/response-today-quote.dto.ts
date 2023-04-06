import {Quote} from '../../quote.entity';

export class ResponseTodayQuoteDto {
  readonly text: string;
  readonly author: string;


  private constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }

  static toDto(quote: Quote) {
    return new ResponseTodayQuoteDto(quote.text, quote.author);
  }
}
