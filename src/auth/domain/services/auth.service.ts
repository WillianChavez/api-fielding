export abstract class AuthService {
  abstract encryptPassword(password: string): string;
  abstract comparePasswords(password: string, hashedPassword: string): string;
}
