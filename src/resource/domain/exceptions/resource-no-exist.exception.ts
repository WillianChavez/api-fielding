export class ResourceNoExistException extends Error {
  constructor(resourceId: string) {
    super(`Resource with id ${resourceId} does not exist`);
  }
}
