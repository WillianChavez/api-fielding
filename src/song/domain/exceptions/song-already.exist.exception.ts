export class SongAlreadyExistException extends Error {
  constructor() {
    super('Song already exists');
  }
}
