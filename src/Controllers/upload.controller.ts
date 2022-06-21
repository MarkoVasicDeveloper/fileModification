import { Controller, Param, Post, Req, Res, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage} from 'multer';
import * as fs from 'fs';
import * as libre from 'libreoffice-convert';
import  {Response} from 'express';
import { ConvertToPdfService } from "src/Services/convert.topdf.service";

@Controller('upload')

export class UploadController{
    constructor(private readonly convertToPdfService: ConvertToPdfService) {}

    @Post('/:ext')
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
     upload(@UploadedFile() file: any, @Req() req, @Res() response: Response, @Param('ext') ext: string) {

        if(req.ErrorMesage) {
            fs.unlinkSync(file.path);
            return response.status(200).send({
                status: -1001,
                message: req.ErrorMesage
            });
        }

        if(ext === 'pdf') 
            return this.convertToPdfService.convert(file.path, file.originalname, response, ext)

        
    }
}
