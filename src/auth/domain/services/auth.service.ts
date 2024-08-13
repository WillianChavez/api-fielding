export abstract class AuthService {
  abstract encryptPassword(password: string): string;
}
