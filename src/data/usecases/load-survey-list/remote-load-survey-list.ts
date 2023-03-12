import { HttpGetClient } from "@/data/protocols/http";

export class RemoteLoadSurveyList {
  constructor(
    private readonly _url: string,
    private readonly _httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<void> {
    await this._httpGetClient.get({ url: this._url });
  }
}
