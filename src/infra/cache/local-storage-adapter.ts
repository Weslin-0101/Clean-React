import { SetStorage } from "@/data/protocols";

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: Object): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
