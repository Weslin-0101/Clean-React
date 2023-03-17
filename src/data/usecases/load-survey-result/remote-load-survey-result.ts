import { HttpGetClient } from "@/data/protocols/http";

export class RemoteLoadSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpGetClient: HttpGetClient
  ) {}
  async load(): Promise<void> {
    await this._httpGetClient.get({ url: this._url });
  }
}
