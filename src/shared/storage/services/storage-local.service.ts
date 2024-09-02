import * as fsp from 'fs/promises';
import { StorageService } from './storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageLocalService extends StorageService<Buffer> {
  async get(uri: string): Promise<Buffer> {
    const buffer = await fsp.readFile(uri);
    return buffer;
  }
  async exists(uri: string): Promise<boolean> {
    const exist = await fsp
      .access(uri)
      .then(() => true)
      .catch(() => false);
    return exist;
  }

  async delete(uri: string): Promise<void> {
    const exists = await this.exists(uri);
    if (!exists) throw new Error(`File not found: ${uri}`);
    await fsp.unlink(uri).catch((error) => {
      throw new Error(`Error deleting file: ${uri}. ${error.message}`);
    });
  }
}
