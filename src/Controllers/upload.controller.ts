import { Body, Controller, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage} from 'multer';
import * as fs from 'fs';
import  {Response} from 'express';
import { ConvertToPdfService } from "src/Services/convert.topdf.service";
import { ModifyPdfService } from "src/Services/modify.pdf.service";
import { ConvertOptionsDto } from "Dto/convert.options.dto";

@Controller('upload')

export class UploadController{
    constructor(private readonly convertToPdfService: ConvertToPdfService,
                private readonly modifyPdfService: ModifyPdfService) {}

    @Post('/:convert')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './Uploads',
                filename: (req, file, callback) => callback(null, file.originalname)
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname
                    .match(/\.(pdf|doc|docx|xlsx|xls|ppt|pptx|pdd|odg|jpg|jpeg|png|gif|psd|bmp|html)/)) {
                    req.ErrorMesage = 'Bad extension';
                    callback(null, false);
                }
                callback(null, true)
            }
        })
    )
    async upload(@UploadedFile() file: any, @Req() req, @Res() response: Response, @Param('convert') convert: string) {
       
        if(req.ErrorMesage) {
            fs.unlinkSync(file.path);
            return response.status(200).send({
                status: -1001,
                message: req.ErrorMesage
            });
        }

        if(convert === 'pdf') 
            return this.convertToPdfService.convert(file.path, file.originalname, response)

        // if(convert === 'modify')
        //     return await this.modifyPdfService.modifyPdf(data, file.originalname, response)

        return response.status(200).send({
            status: 'Upload',
            fileName: file.originalname
        })
    }
}
