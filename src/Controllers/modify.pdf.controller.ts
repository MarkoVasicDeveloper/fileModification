import { Body, Controller, Post, Res } from "@nestjs/common";
import { ModifyAllPageDto } from "Dto/modify.all.page.dto";
import { Response } from "express";
import { ModifyPdfService } from "src/Services/modify.pdf.service";
import * as fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

@Controller('modify')

export class ModifyPdfController {
    constructor(private readonly modifyService: ModifyPdfService) {}

    @Post('allPages')
    async modifyAllPages(@Body() data: ModifyAllPageDto, @Res() response: Response) {
        const readFile = fs.readFileSync(`Uploads/${data.fileName}`)

        const pdfDoc = await PDFDocument.load(readFile)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.CourierBoldOblique);

        const pages = pdfDoc.getPages();

        pages.forEach(page => {
    
            page.drawText(data.text, {
                x: data.position[0] | 0,
                y: data.position[1] | 20,
                size: data.fontSize | 20,
                font: helveticaFont,
                color: rgb(data.color[0] | 0,
                          data.color[1] | 0,
                          data.color[2] | 0)
            })
          })

          const pdfBytes = await pdfDoc.save()

        fs.writeFileSync(`Convert/${data.fileName}`, pdfBytes);

        fs.unlinkSync(`Uploads/${data.fileName}`)

        return response.status(200).send({
            status: 'Modify',
            file: `http://localhost:4000/download/${data.fileName}`
        })
    }
}