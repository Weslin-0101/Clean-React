import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyResult } from "@/domain/usecases";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly _url: string,
    private readonly _httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}
  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this._httpGetClient.get({ url: this._url });
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
  export type Model = {
    question: string;
    date: string;
    answers: AnswerModel[];
  };

  export type AnswerModel = {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswer: boolean;
  };
}
