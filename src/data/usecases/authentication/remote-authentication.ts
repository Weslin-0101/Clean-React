import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { AuthenticationParams } from "@/domain/usecases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly _url: string,
    private readonly _httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    await this._httpPostClient.post({
      url: this._url,
      body: params,
    });
  }
}
