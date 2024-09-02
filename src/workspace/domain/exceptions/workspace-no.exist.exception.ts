export class WorkspaceNoExistException extends Error {
  constructor(name: string) {
    super(`Workspace ${name} does not exist`);
  }
}
