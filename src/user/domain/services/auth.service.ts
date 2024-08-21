export abstract class AuthService {
  abstract encryptPassword(password: string): Promise<string>;
  abstract comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
  abstract generateToken(payload: { id: string }): string;
}
