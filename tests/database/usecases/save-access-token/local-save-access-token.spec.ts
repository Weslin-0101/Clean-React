import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { SetStorageSpy } from "@/tests/database/mocks";

import faker from "faker";

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct values", async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
