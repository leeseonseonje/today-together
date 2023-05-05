import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quote} from './quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
})
export class QuoteModule {
}
