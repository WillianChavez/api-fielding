import { BadRequestException } from '@nestjs/common';

export abstract class StorageFilter {
  static filterFile(format: string[]) {
    return (req, file, cb) => {
      if (file && !format.includes(file.mimetype)) {
        return cb(
          new BadRequestException(`Only permit format ${format.join(' ')}`),
          false,
        );
      }
      cb(null, true);
    };
  }

  static filterImage() {
    return this.filterFile(['image/jpeg', 'image/png', 'image/jpg']);
  }

  static filterVideo() {
    return this.filterFile(['video/mp4', 'video/quicktime']);
  }

  static filterAudio() {
    return this.filterFile(['audio/mpeg', 'audio/wav']);
  }
}
