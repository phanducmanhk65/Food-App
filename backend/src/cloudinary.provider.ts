import { ConfigService } from "@nestjs/config";
import { v2 } from "cloudinary";


export const CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: (config: ConfigService) => {
        return v2.config({
            cloud_name: 'ddep2zxtx',
            api_key: '168913474316147',
            api_secret: 'YS2J9aTlsE9TZFzils8rrEZCOXs'
        });
    },
    inject: [ConfigService],
}