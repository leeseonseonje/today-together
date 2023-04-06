export const translatorApi = 'translatorApi';

export interface TranslatorApi {

  translation(activity: string): Promise<string>;
}
