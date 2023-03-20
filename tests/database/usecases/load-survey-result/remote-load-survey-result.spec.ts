import { HttpStatusCode } from "@/data/protocols";
import { RemoteLoadSurveyResult } from "@/data/usecases";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import {
  HttpClientSpy,
  mockRemoteSurveyResultModel,
} from "@/tests/database/mocks";

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = "any_url"): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteLoadSurveyResult Usecase", () => {
  test("Should call httpClient with correct URL and Method", async () => {
    const url = "any_url";
    const { sut, httpClientSpy } = makeSut(url);
    const httpResult = mockRemoteSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
  });

  test("Should throw AccessDeniedError if httpClient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test("Should throw UnexpectedError if httpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if httpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a SurveyResult on 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const result = mockRemoteSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result,
    };
    const httpResponse = await sut.load();
    expect(httpResponse).toEqual({
      question: result.question,
      date: new Date(result.date),
      answers: result.answers,
    });
  });
});
