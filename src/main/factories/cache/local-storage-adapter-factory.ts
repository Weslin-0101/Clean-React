import { SetStorage } from "@/data/protocols";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};
