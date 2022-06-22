import { Body, Controller, Get, Param, Post, Res, Response, StreamableFile } from "@nestjs/common";
import * as fs from 'fs';
import { join } from "path";

@Controller('download')

export class DownloadController{

    @Get('/:file')
    download(@Param('file') file: any, @Response({ passthrough: true }) res) {
        
        const readStream = fs.createReadStream(join(process.cwd(), `Convert/${file}`));
        res.set({
            'Content-Type': `application/pdf`,
            'Content-Disposition': `attachment; filename="${file}"`
          })
        return new StreamableFile(readStream);
    }
}
