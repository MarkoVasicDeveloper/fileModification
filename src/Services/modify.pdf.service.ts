import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { ConvertOptionsDto } from 'Dto/convert.options.dto';

@Injectable()

export class ModifyPdfService {


async modifyPdf(data: ConvertOptionsDto ,fileName: string, response: any) {

  const readFile = fs.readFileSync(`Uploads/${fileName}`)

  const pdfDoc = await PDFDocument.load(readFile)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.CourierBoldOblique);

  const pages = pdfDoc.getPages();

  if(data.textOptions.allPage) 
    return pages.forEach(page => {
    
    page.drawText(data.textOptions.text, {
        x: data.textOptions.position[0] | 0,
        y: data.textOptions.position[1] | 20,
        size: data.textOptions.fontSize | 20,
        font: helveticaFont,
        color: rgb(data.textOptions.color[0] | 0,
                  data.textOptions.color[1] | 0,
                  data.textOptions.color[2] | 0)
    })
  })

  data.textOptions.customPages.forEach(page => {
    const currentPage = pdfDoc.getPage(page.numberOfPage);

    currentPage.drawText(page.text, {
      x: page.position[0] | 0,
      y: page.position[1] | 20,
      size: page.fontSize | 20,
      font: helveticaFont,
      color: rgb(page.color[0] | 0,
                page.color[1] | 0,
                page.color[2] | 0
                )
    })
  })

  const pdfBytes = await pdfDoc.save()

  fs.writeFileSync(`Convert/${fileName}`, pdfBytes);

  fs.unlinkSync(`Uploads/${fileName}`)

  return response.status(200).send({
    status: 'Modify',
    file: `http://localhost:4000/download/${fileName}`
  })
}
}