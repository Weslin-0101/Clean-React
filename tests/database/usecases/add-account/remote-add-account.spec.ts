import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { mockAddAccountParams } from "@/tests/domain/mocks";
import { HttpPostClientSpy } from "@/tests/database/mocks";
import { AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";

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
});
