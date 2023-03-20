import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { mockAccountModel, mockAddAccountParams } from "@/tests/domain/mocks";
import { HttpClientSpy } from "@/tests/database/mocks";
import { AccountModel } from "@/domain/models";
import { HttpStatusCode } from "@/data/protocols";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<AccountModel>;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AccountModel>();
  const sut = new RemoteAddAccount(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpClient with correct values", async () => {
    const url = "any_url";
    const { sut, httpClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.body).toEqual(addAccountParams);
    expect(httpClientSpy.method).toBe("post");
  });

  test("Should throw EmailInUseError if HttpCLient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test("Should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpClient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return an AccountModel on success", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(httpResult);
  });
});
