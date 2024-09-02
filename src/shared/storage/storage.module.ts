import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageConfig } from './config/storage.config';
import { StorageService } from './services/storage.service';
import { StorageLocalService } from './services/storage-local.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => StorageConfig.default('./uploads'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: StorageService,
      useClass: StorageLocalService,
    },
  ],
  exports: [MulterModule, StorageService],
})
export class StorageModule {}
