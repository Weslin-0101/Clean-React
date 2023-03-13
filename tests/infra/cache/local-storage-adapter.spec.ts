import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import "jest-localstorage-mock";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should call localStorage with correct values", async () => {
    const sut = makeSut();
    const key = "any_key";
    const value = {
      any: "any_value",
    };
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });
});
