import {TranslatorApi} from "./TranslatorApi";
import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {PapagoInfo} from "./PapagoInfo";

@Injectable()
export class PapagoApi implements TranslatorApi {

  private readonly url: string = 'https://openapi.naver.com/v1/papago/n2mt';

  constructor(
    private readonly httpService: HttpService
  ) {
  }

  async apiCall(activity: string) {
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
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': PapagoInfo.ID,
        'X-Naver-Client-Secret': PapagoInfo.SECRET,
      }
    };
  }
}