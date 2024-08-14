/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveSong {
  id: string;
  name: string;
  artist: string;
  album: string;
}

export class Song {
  constructor(private attributes: PrimitiveSong) {}

  static create(data: { name: string; artist: string; album: string }): Song {
    return new Song({
      id: uuidv4(),
      name: data.name,
      artist: data.artist,
      album: data.album,
    });
  }

  toValue(): PrimitiveSong {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      artist: this.attributes.artist,
      album: this.attributes.album,
    };
  }
}
