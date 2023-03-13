export interface SetStorage {
  set(key: string, value: Object): Promise<void>;
}
