import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly _url: string,
    private readonly _httpClient: HttpClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this._httpClient.request({
      url: this._url,
      method: "get",
    });
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) => ({
          ...remoteSurvey,
          date: new Date(remoteSurvey.date),
        }));
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
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
