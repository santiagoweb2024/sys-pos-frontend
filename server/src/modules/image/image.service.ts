import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateImageDto } from './image.dto';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY } from '@/common/constants';
import { ImageRepository } from './image.repository';
type cloudinaryType = typeof cloudinary;
@Injectable()
export class ImageService {
  logger = new Logger('ImageService');
  constructor(
    @Inject(CLOUDINARY) private readonly cloudinary: cloudinaryType,
    private readonly imageRepository: ImageRepository,
  ) {}
  async upload(file: Express.Multer.File): Promise<UploadApiResponse> {
    const byteArrayBuffer = file.buffer;
    try {
      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          this.cloudinary.uploader
            .upload_stream(
              {
                folder: 'product',
                unique_filename: true,
              },
              (error, uploadResult) => {
                if (error) {
                  reject(error);
                } else if (uploadResult) {
                  resolve(uploadResult);
                }
              },
            )
            .end(byteArrayBuffer);
        },
      );
      return uploadResult;
    } catch (error) {
      this.logger.error('Error subiendo la imagen a Cloudinary', error);
      throw new Error('Error subiendo la imagen a Cloudinary');
    }
  }

  async create(data: CreateImageDto) {
    return await this.imageRepository.createImage(data);
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: any) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
