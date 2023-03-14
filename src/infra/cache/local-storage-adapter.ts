import { SetStorage, GetStorage } from "@/data/protocols";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  async set(key: string, value: Object): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
