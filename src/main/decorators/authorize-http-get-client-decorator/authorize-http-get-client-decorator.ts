import { GetStorage } from "@/data/protocols";
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly _getStorage: GetStorage,
    private readonly _httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this._getStorage.get("account");
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          "x-access-token": account.accessToken,
        }),
      });
    }
    await this._httpGetClient.get(params);
    return null;
  }
}
