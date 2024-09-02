import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export abstract class StorageConfig {
  static default(destination: string): MulterOptions {
    return this.local(destination);
  }
  static local(destination: string): MulterOptions {
    return {
      dest: destination,
      storage: diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension = file.originalname.split('.').pop();
          cb(null, `${filename}.${extension}`);
        },
      }),
    };
  }

  static s3(destination: string): MulterOptions {
    throw new Error(`Method not implemented. ${destination}`);
  }
}
