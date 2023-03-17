import { HttpStatusCode } from "@/data/protocols";
import { RemoteLoadSurveyResult } from "@/data/usecases";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import {
  HttpGetClientSpy,
  mockRemoteSurveyResultModel,
} from "@/tests/database/mocks";

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = "any_url"): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe("RemoteLoadSurveyResult Usecase", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = "any_url";
    const { sut, httpGetClientSpy } = makeSut(url);
    const httpResult = mockRemoteSurveyResultModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw AccessDeniedError if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test("Should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a SurveyResult on 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const result = mockRemoteSurveyResultModel();
    httpGetClientSpy.response = {
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
