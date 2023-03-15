import { SetStorage, GetStorage } from "@/data/protocols";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  async set(key: string, value: Object): Promise<void> {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
