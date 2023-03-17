import { HttpStatusCode } from "@/data/protocols";
import { RemoteLoadSurveyResult } from "@/data/usecases";
import { AccessDeniedError } from "@/domain/errors";
import { HttpGetClientSpy } from "@/tests/database/mocks";

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
});
