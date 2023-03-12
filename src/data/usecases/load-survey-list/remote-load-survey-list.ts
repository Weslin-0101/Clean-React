import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteLoadSurveyList {
  constructor(
    private readonly _url: string,
    private readonly _httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<void> {
    const httpResponse = await this._httpGetClient.get({ url: this._url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}
