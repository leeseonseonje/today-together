import {Global, Module} from '@nestjs/common';
import {translatorApi} from './translator.api';
import {PapagoApi} from './papago.api';
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
export class TranslatorInfraModule {
}
