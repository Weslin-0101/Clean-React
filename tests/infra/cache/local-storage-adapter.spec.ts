import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import "jest-localstorage-mock";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("set", () => {
    test("Should call localStorage.setItem with correct values", async () => {
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

    test("Should call localStorage.removeItem if value is null", async () => {
      const sut = makeSut();
      const key = "any_key";
      await sut.set(key, undefined);
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  describe("get", () => {
    test("Should call localStorage.getItem with correct value", () => {
      const sut = makeSut();
      const key = "any_key";
      const value = {
        any: "any_value",
      };
      const getItemSpy = jest
        .spyOn(localStorage, "getItem")
        .mockReturnValueOnce(JSON.stringify(value));
      const obj = sut.get(key);
      expect(obj).toEqual(value);
      expect(getItemSpy).toHaveBeenCalledWith(key);
    });
  });
});
