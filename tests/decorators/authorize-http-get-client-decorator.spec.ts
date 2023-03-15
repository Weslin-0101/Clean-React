import { HttpGetParams } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import {
  GetStorageSpy,
  HttpGetClientSpy,
  mockGetRequest,
} from "@/tests/database/mocks";
import { mockAccountModel } from "../domain/mocks";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  );
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
};

describe("AuthorizeHttpGetClientDecorator", () => {
  test("Should call GetStorage with correct value", async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });

  test("Should not add headers if GetStorage is invalid", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: "any_url",
      headers: {
        field: "any_field",
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  test("Should add headers if GetStorage is valid", async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: "any_url",
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("Should merge headers to HttpGetClient", async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = "any_field";
    const httpRequest: HttpGetParams = {
      url: "any_url",
      headers: {
        field,
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("Should return the same result as HttpGetClient", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResponse = await sut.get(mockGetRequest());
    expect(httpResponse).toEqual(httpGetClientSpy.response);
  });
});
