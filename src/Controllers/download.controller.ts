import { Body, Controller, Get, Param, Post, Res, Response, StreamableFile } from "@nestjs/common";
import * as fs from 'fs';
import { join } from "path";

@Controller('download')

export class DownloadController{

    @Get('/:file/:ext')
    download(@Param('file') file: any,@Param('ext') ext: string, @Response({ passthrough: true }) res) {
        
        const readStream = fs.createReadStream(join(process.cwd(), `Convert/${file}.${ext}`));
        res.set({
            'Content-Type': `application/${ext}`,
            'Content-Disposition': `attachment; filename="${file}.${ext}"`
          })
        return new StreamableFile(readStream);
    }
}
