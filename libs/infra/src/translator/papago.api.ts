import {TranslatorApi} from "./translator.api";
import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as yaml from 'js-yaml';
import {readFileSync} from 'fs';
import {join} from 'path';
import {YAML_PATH} from '../../yml/path';

@Injectable()
export class PapagoApi implements TranslatorApi {

  private readonly url: string = 'https://openapi.naver.com/v1/papago/n2mt';

  constructor(
    private readonly httpService: HttpService
  ) {
  }

  async translation(activity: string) {
    const request = this.url + this.paramBuild(activity);
    const response = await this.httpService.axiosRef.post(request,
      {},
      this.setHeader())
      .catch(error => {
        throw new InternalServerErrorException(error);
      });

    return response.data.message.result.translatedText;
  }

  private paramBuild(activity: string) {
    return `?source=en&target=ko&text=${activity}`;
  }

  private setHeader() {
    const translatorConfig = yaml
      .load(readFileSync(join(YAML_PATH, 'translator.yml'), 'utf8')) as Record<string, any>;

    const id = translatorConfig.papago.id;
    const secret = translatorConfig.papago.secret;
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': id,
        'X-Naver-Client-Secret': secret,
      }
    };
  }
}
