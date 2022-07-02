import { BlendMode, degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as fontKit from'@pdf-lib/fontkit';
import { ModifyAllPageDto } from 'Dto/modify.all.page.dto';
import { ModifyIndividualPagesInPDFdto } from 'Dto/modify.individual.pages.dto';

@Injectable()

export class ModifyPdfService {

async modifyPdf(data: ModifyAllPageDto , response: any) {

  try {
    fs.accessSync(`Uploads/${data.fileName}`, fs.constants.F_OK)
    
  } catch (error) {
    return response.status(200).send({
      error: 'File is not uploaded!',
      status: -1200
    })
  }

  const readFile = fs.readFileSync(`Uploads/${data.fileName}`)

  const pdfDoc = await PDFDocument.load(readFile)

  pdfDoc.registerFontkit(fontKit);
  const fontBytes = fs.readFileSync(data.font ? `Fonts/${data.font}.ttf` : 'Fonts/Poppins-Bold.ttf');
  const customFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();

  if(data.addText) pages.forEach(page => {

      page.drawText(data.text, {
          x: data.position[0] || 20,
          y: data.position[1] || 20,
          size: data.fontSize || 20,
          font: customFont,
          color: rgb(data.color[0] || 0, data.color[1] || 0, data.color[2] || 0),
          opacity: data.opacity || 1,
          rotate: degrees(data.rotate) || degrees(0),
          lineHeight: data.lineHeight || 1.76,
          xSkew: degrees(data.xSkrew) || degrees(0),
          ySkew: degrees(data.ySkrew) || degrees(0),
      })
    })

  if(data.photo) {
    const image = fs.readFileSync(`Photos/${data.photoName}`);

    const jpgImage = await pdfDoc.embedJpg(image);

    pages.forEach(page => {
      page.drawImage(jpgImage, {
        x: data.photoPosition[0],
        y: data.photoPosition[1],
        width: Number(data.width),
        height: Number(data.height),
        opacity: data.photoOpacity,
        rotate: degrees(data.photoRotate)
      })
    })
  }

  const pdfBytes = await pdfDoc.save()

  fs.writeFileSync(`Convert/${data.fileName}`, pdfBytes);

  fs.unlinkSync(`Uploads/${data.fileName}`)

    return response.status(200).send({
      status: 'Modify',
      file: `http://localhost:4000/download/${data.fileName}`
    })
  }

  async modifyIndividualPagesInPDF (data: ModifyIndividualPagesInPDFdto, response: any) {
    
    try {
      fs.accessSync(`Uploads/${data.fileName}`, fs.constants.F_OK)
      
    } catch (error) {
      return response.status(200).send({
        error: 'File is not uploaded!',
        status: -1200
      })
    }
    
    const readFile = fs.readFileSync(`Uploads/${data.fileName}`);

    const pdfDoc = await PDFDocument.load(readFile)

    pdfDoc.registerFontkit(fontKit);
    const fontBytes = fs.readFileSync(data.font[0] ? `Fonts/${data.font[0]}.ttf` : 'Fonts/Poppins-Bold.ttf');
    const customFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages();
    
    if(data.addText) data.pages.forEach((pageIndex, index) => {
      
      if (page.length <= Number(pageIndex)) pageIndex = page.length - 1;
      
      page[pageIndex].drawText(data.text[index] || data.text[data.text.length - 1], {
        x: data.position[index === 0 ? index : index + 1] || 20,
        y: data.position[index === 0 ? index + 1 : index + 2] || 20,
        size: data.fontSize[index] || 12,
        font: customFont,
        color: rgb(Number(data.color[index * 3]) || 0,
                   Number(data.color[index * 3 + 1]) || 0,
                   Number(data.color[index * 3 + 2]) || 0),
        opacity: data.opacity[index] || 1,
        rotate: degrees(data.rotate[index]) || degrees(0),
        lineHeight: data.lineHeight[index] || 1.76,
        xSkew: degrees(data.xSkrew[index]) || degrees(0),
        ySkew: degrees(data.ySkrew[index]) || degrees(0),
    })
  })

  if(data.photo) {
    
    data.pagesForPhoto.forEach(async (pageIndex, index) => {
      const image = fs.readFileSync(`Photos/${data.photoName[index]}`);
      const jpgImage = await pdfDoc.embedJpg(image);

      page[pageIndex].drawImage(jpgImage, {
        x: data.photoPosition[index === 0 ? index : index + 1] || 20,
        y: data.photoPosition[index === 0 ? index + 1 : index + 2] || 20,
        width: Number(data.width) || 200,
        height: Number(data.height) || 300,
        opacity: data.photoOpacity[index] || 1,
        rotate: degrees(data.photoRotate[index] || 0)
      })
    })
   }

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync(`Convert/${data.fileName}`, pdfBytes);

    fs.unlinkSync(`Uploads/${data.fileName}`)

      return response.status(200).send({
        status: 'Modify',
        file: `http://localhost:4000/download/${data.fileName}`
      })
  }
}