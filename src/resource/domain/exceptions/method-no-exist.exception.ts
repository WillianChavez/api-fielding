export class MethodNoExistException extends Error {
  constructor(methodId: string) {
    super(`Method with id ${methodId} does not exist`);
  }
}
