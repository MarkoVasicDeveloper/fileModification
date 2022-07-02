import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import * as fs from 'fs';

@Controller('uploadPhoto')

export class UploadPhotoController {

    @Post()
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: 'Photos',
                filename: (req, file, callback) => callback(null, file.originalname),
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname.match(/\.(jpg|png)$/)) {
                    req.ErrorMessage = 'Bad extension'
                    callback(null, false);
                }
                callback(null, true);
            },
            limits: {
                files: 1
            }
        })
    )
    async uploadPhoto (@UploadedFile() photo: any, @Res() response: Response, @Req() req) {
        if(req.ErrorMessage) {
            fs.unlinkSync(photo.path);
            return response.status(200).send({
                status: -1001,
                message: req.ErrorMessage
            })
        }

        return response.status(200).send({
            status: 'Upload',
            fileName: photo.originalname
        })
    }
}