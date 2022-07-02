import { Body, Controller, Post, Res } from "@nestjs/common";
import { ModifyAllPageDto } from "Dto/modify.all.page.dto";
import { Response } from "express";
import { ModifyPdfService } from "src/Services/modify.pdf.service";
import { ModifyIndividualPagesInPDFdto } from "Dto/modify.individual.pages.dto";
const fontKit = require ('@pdf-lib/fontkit')

@Controller('modify')

export class ModifyPdfController {
    constructor(private readonly modifyService: ModifyPdfService) {}

    @Post('allPages')
    async modifyAllPages(@Body() data: ModifyAllPageDto, @Res() response: Response) {

        return await this.modifyService.modifyPdf(data, response)
    }

    @Post('individualPages')
    async modifyIndividualOages (@Body() data: ModifyIndividualPagesInPDFdto, @Res() response: Response) {
        return await this.modifyService.modifyIndividualPagesInPDF(data, response)
    }
}