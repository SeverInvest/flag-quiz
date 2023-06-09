import { connectWikipediaEn } from './connect.js';
import BaseApi from './BaseApi.js';

class WikipediaApiEn extends BaseApi {
  constructor() {
    super(connectWikipediaEn);
  }

  getInfoCountryEn(
    nameCountry,
  ) {
    return super._requestWithoutToken(
      '?' + new URLSearchParams({
        action: "query",
        prop: "extracts",
        exlimit: 1,
        titles: nameCountry,
        explaintext: 1,
        exsectionformat: "plain",
        format: "json",
        exsentences: 10,
        origin: "*",
      }),
      {
        method: "GET"
      }
    )
  }
}

export const wikipediaApiEn = new WikipediaApiEn(connectWikipediaEn);


