import { Injectable } from '@nestjs/common';
import {Multer} from 'multer';
import {v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';



@Injectable()
export class CloudinaryService {
  
  async uploadFile(
    file: Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(file.buffer)
    })
  }

}