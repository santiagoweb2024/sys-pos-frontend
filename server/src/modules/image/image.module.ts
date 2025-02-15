import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageRepository } from './image.repository';
import { DatabaseModule } from '@/database/database.module';
@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 3 * 1024 * 1024 },
    }),
  ],
  controllers: [ImageController],
  providers: [CloudinaryProvider, ImageService, ImageRepository],
  exports: [CloudinaryProvider, ImageService]
})
export class ImageModule {}
