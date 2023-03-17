import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";

export class RemoteLoadSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpGetClient: HttpGetClient
  ) {}
  async load(): Promise<void> {
    const httpResponse = await this._httpGetClient.get({ url: this._url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
