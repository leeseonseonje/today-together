export class QuoteApiResponseDto {

  private readonly text: string;
  private readonly author: string;

  constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }


  toString(): string {
    return `${this.text}-${this.author}`
  }
}
