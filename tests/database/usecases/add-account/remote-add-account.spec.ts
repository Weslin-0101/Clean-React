import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { mockAddAccountParams } from "@/tests/domain/mocks";
import { HttpPostClientSpy } from "@/tests/database/mocks";
import { AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { HttpStatusCode } from "@/data/protocols";
import { EmailInUseError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "any_url";
    const { sut, httpPostClientSpy } = makeSut();
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Shout call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test("Should throw EmailInUseError if HttpPostCLient returns 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
});
