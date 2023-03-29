import {Global, Module} from '@nestjs/common';
import {translatorApi} from './TranslatorApi';
import {PapagoApi} from './PapagoApi';
import {HttpModule} from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {provide: translatorApi, useClass: PapagoApi},
  ],
  exports: [
    {provide: translatorApi, useClass: PapagoApi}
  ]
})
export class TranslatorModule {
}
