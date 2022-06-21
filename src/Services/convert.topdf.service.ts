import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from "fs";
import * as libre from 'libreoffice-convert';

@Injectable()

export class ConvertToPdfService{
    
    convert(filePath: fs.PathOrFileDescriptor, fileOriginName: string, response: any, ext: string) {
        
        const file = fs.readFileSync(filePath);
 
        libre.convert(file,`.${ext}`, undefined, (err, done) => {
           if (err) {
             console.log(`Error converting file: ${err}`);
           }
      
          fs.writeFileSync(`Convert/${fileOriginName}.${ext}`, done);

          fs.unlinkSync(`Uploads/${fileOriginName}`)
          response.status(200)
          return response.send({
              status: 'Converted',
              file: `http://localhost:4000/download/${fileOriginName}/${ext}`
          })
       });
    }
}