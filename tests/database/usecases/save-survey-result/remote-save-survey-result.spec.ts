import { HttpStatusCode } from "@/data/protocols";
import { RemoteSaveSurveyResult } from "@/data/usecases";
import {
  HttpClientSpy,
  mockRemoteSaveSurveyResultParams,
  mockRemoteSurveyResultModel,
} from "@/tests/database/mocks";

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = "any_url"): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteSaveSurveyResult Usecase", () => {
  test("Should call httpClient with correct values", async () => {
    const url = "any_url";
    const { sut, httpClientSpy } = makeSut(url);
    const httpResult = mockRemoteSurveyResultModel();
    const httpParams = mockRemoteSaveSurveyResultParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    await sut.save(httpParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toEqual(httpParams);
  });
});
