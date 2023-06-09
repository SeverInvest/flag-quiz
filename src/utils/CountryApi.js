import { connectCountries } from './connect.js';
import BaseApi from './BaseApi.js';

class CountriesApi extends BaseApi {
  constructor() {
    super(connectCountries);
  }

  getAllCountries() {
    return super._requestWithoutToken(
      '/',
      {
        method: "GET"
      }
    )
  }
}

const countriesApi = new CountriesApi(connectCountries);

export default countriesApi;