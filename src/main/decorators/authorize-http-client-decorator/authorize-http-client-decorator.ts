import { GetStorage } from "@/data/protocols";
import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly _getStorage: GetStorage,
    private readonly _httpClient: HttpClient
  ) {}

  async request(params: HttpRequest): Promise<HttpResponse<any>> {
    const account = this._getStorage.get("account");
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          "x-access-token": account.accessToken,
        }),
      });
    }
    return this._httpClient.request(params);
  }
}
