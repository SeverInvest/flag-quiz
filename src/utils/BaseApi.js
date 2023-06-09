// 'use strict';

export default class BaselApi {
  constructor(connect) {
    this._baseUrl = connect.baseUrl;
    this._headers = connect.headers;
}
  async _checkResponse(result) {
    if (result.ok) {
      return await result.json();
    }
    return Promise.reject(await result.json())
  }

  // async _requestWithToken(url, options) {
  //   const token = localStorage.getItem('jwt');
  //   const result = await fetch(
  //     `${this._baseUrl}${url}`,
  //     Object.assign(options, { headers: { ...this._headers, "Authorization": `Bearer ${token}`, } })
  //   );
  //   return this._checkResponse(result);
  // }

  async _requestWithoutToken(url, options) {
    const result = await fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options, { headers: this._headers })
    );
    return this._checkResponse(result);
  }
}
