import { Module } from '@nestjs/common';
import { DownloadController } from './Controllers/download.controller';
import { UploadController } from './Controllers/upload.controller';
import { ConvertToPdfService } from './Services/convert.topdf.service';

@Module({
  imports: [],
  controllers: [UploadController, DownloadController],
  providers: [ConvertToPdfService],
})
export class AppModule {}
