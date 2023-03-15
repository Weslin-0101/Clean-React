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
    this._getStorage.get("account");
    await this._httpGetClient.get(params);
    return null;
  }
}
