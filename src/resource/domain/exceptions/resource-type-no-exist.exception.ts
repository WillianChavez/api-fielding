export class ResourceTypeNoExistException extends Error {
  constructor(resourceTypeId: string) {
    super(`Resource type with id ${resourceTypeId} does not exist`);
  }
}
