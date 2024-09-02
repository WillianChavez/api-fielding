export abstract class StorageService<T> {
  abstract get(uri: string): Promise<T>;
  abstract exists(uri: string): Promise<boolean>;
  abstract delete(uri: string): Promise<void>;
}
