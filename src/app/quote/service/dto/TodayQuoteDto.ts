import {Quote} from '../../Quote.entity';

export class TodayQuoteDto {
  readonly text: string;
  readonly author: string;


  private constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }

  static toDto(quote: Quote) {
    return new TodayQuoteDto(quote.text, quote.author);
  }
}
