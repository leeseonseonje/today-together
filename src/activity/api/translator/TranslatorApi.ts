import {Injectable} from "@nestjs/common";

export interface TranslatorApi {

  apiCall(activity: string);
}