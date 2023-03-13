import { LocalUpdateCurrentAccount } from "@/data/usecases/update-current-account/local-update-current-account";
import { SetStorageMock } from "@/tests/database/mocks";
import { mockAccountModel } from "@/tests/domain/mocks";

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe("LocalUpdateCurrentAccount", () => {
  test("Should call SetStorage with correct values", async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();
    await sut.save(account);
    expect(setStorageMock.key).toBe("account");
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });
});
