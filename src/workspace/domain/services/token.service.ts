export abstract class TokenService<T extends object> {
  abstract encrypt(payload: T, exp?: number | string): Promise<string>;
  abstract decrypt(token: string): Promise<T>;
}
