import {Quote} from '../../quote.entity';
import {ApiProperty} from '@nestjs/swagger';

export class ResponseTodayQuoteDto {

  @ApiProperty({
    example: '시작하는 방법은 말을 그만두고 행동을 시작하는 것입니다.',
    description: '오늘의 명언',
  })
  readonly text: string;

  @ApiProperty({
    example: '월트 디즈니',
    description: '말한 이',
  })
  readonly author: string;


  private constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }

  static toDto(quote: Quote) {
    return new ResponseTodayQuoteDto(quote.text, quote.author);
  }
}
