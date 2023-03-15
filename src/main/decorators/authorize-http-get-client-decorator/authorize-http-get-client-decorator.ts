import { GetStorage } from "@/data/protocols";
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly _getStorage: GetStorage) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    this._getStorage.get("account");
    return null;
  }
}
