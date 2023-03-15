import { GetStorage, SetStorage } from "@/data/protocols";

export class SetStorageMock implements SetStorage {
  key: string;
  value: string;

  async set(key: string, value: string): Promise<void> {
    this.key = key;
    this.value = value;
  }
}

export class GetStorageSpy implements GetStorage {
  key: string;
  value = "any_value";

  get(key: string) {
    this.key = key;
    return this.value;
  }
}
