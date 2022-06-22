import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from "fs";
import * as libre from 'libreoffice-convert';

@Injectable()

export class ConvertToPdfService{
    
    convert(filePath: fs.PathOrFileDescriptor, fileOriginName: string, response: any) {
        
        const file = fs.readFileSync(filePath);
 
        libre.convert(file,`.pdf`, undefined, (err, done) => {
           if (err) {
             console.log(`Error converting file: ${err}`);
           }
      
          fs.writeFileSync(`Convert/${fileOriginName}.pdf`, done);

          fs.unlinkSync(`Uploads/${fileOriginName}`)
          response.status(200)
          return response.send({
              status: 'Converted',
              file: `http://localhost:4000/download/${fileOriginName}.pdf`,
              fileName: fileOriginName
          })
       });
    }
}