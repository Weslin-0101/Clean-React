import { HttpPostClient } from "@/data/protocols/http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly _url: string,
    private readonly _httpPostClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    await this._httpPostClient.post({ url: this._url });
  }
}
