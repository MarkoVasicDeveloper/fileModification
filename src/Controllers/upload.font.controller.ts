import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from 'fs';
import { Response } from "express";

@Controller('uploadFont')

export class UploadFontController {

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './Fonts',
                filename: (req, file, callback) => callback(null, file.originalname)
            }),
            fileFilter:(req, file, callback) => {
                if(!file.originalname.match(/\.(ttf)/)) {
                    req.ErrorMessage = 'Bad extension';
                    callback(null, false)
                }
                callback(null, true)
            },
            limits: {
                files: 1
            }
        })
    )
    uploadFont(@UploadedFile() file: any, @Req() req: any, @Res() response: Response) {
        if(req.ErrorMessage) {
            fs.unlinkSync(`./Fonts/${file.originalname}`)
            return response.status(200).send({
                status: -1001,
                message: req.ErrorMesage
            });
        }

        return response.status(200).send({
            status: 'Font uploaded',
            fileName: file.originalname
        })
    }
}