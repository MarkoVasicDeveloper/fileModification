import { Module } from '@nestjs/common';
import { DownloadController } from './Controllers/download.controller';
import { ModifyPdfController } from './Controllers/modify.pdf.controller';
import { UploadController } from './Controllers/upload.controller';
import { ConvertToPdfService } from './Services/convert.topdf.service';
import { ModifyPdfService } from './Services/modify.pdf.service';

@Module({
  imports: [],
  controllers: [UploadController, DownloadController, ModifyPdfController],
  providers: [ConvertToPdfService, ModifyPdfService],
})
export class AppModule {}
