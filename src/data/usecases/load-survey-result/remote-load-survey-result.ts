import { RemoteSurveyResultModel } from "@/data/models";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyResult } from "@/domain/usecases";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}
  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this._httpClient.request({
      url: this._url,
      method: "get",
    });
    const remoteSurveyResult = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date),
        });
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
