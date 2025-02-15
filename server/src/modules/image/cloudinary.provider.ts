import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY } from '@/common/constants';
import { appConfig } from '@/config/app/env.loader';
export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory() {
        cloudinary.config({
            cloud_name: appConfig.CLOUDINARY_CLOUD_NAME,
            api_key: appConfig.CLOUDINARY_API_KEY,
            api_secret: appConfig.CLOUDINARY_API_SECRET,
        });
        return cloudinary;
    },
}