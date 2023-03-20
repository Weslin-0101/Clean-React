import { SaveSurveyResult } from "@/domain/usecases";
import { RemoteSurveyResultModel } from "@/data/models";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this._httpClient.request({
      url: this._url,
      method: "put",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return null;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
