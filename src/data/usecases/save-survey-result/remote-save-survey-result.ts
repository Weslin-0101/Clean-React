import { SaveSurveyResult } from "@/domain/usecases";
import { RemoteSurveyResultModel } from "@/data/models";
import { HttpClient } from "@/data/protocols/http";

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    await this._httpClient.request({
      url: this._url,
      method: "put",
    });
    return null;
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
