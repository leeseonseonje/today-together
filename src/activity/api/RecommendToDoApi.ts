import {BadRequestException, Injectable} from "@nestjs/common";
import {RecommendToDoApiResponse} from "./dto/RecommendToDoApiResponse";
import {HttpService} from "@nestjs/axios";
import {map, tap} from "rxjs";
import {log} from "util";
import {RequestActivityDto} from "../RequestActivityDto";

@Injectable()
export class RecommendToDoApi {

    private readonly url: string = 'https://www.boredapi.com/api/activity'
    constructor(
        private readonly httpService: HttpService
    ) {
    }

    async apiCall(params: RequestActivityDto) {
        const request = this.url + this.paramBuild(params);
        const response = await this.httpService.axiosRef.get(request);

        if (response.data.error !== undefined) {
            throw new BadRequestException('할 게 없습니다.');
        }
        return response.data as RecommendToDoApiResponse;
    }

    private paramBuild(params: RequestActivityDto) {
        return `?type=${params.type}&participants=${params.participants}`;
    }
}