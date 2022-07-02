import * as validator from 'class-validator';

export class ModifyIndividualPagesInPDFdto{
    @validator.IsString()
    @validator.IsNotEmpty()
    fileName: string;
    addText: boolean = false;
    text: string[];
    position: number[];
    font?: string[];
    color?: number[];
    fontSize?: number[];
    pages: number[];
    opacity: number[];
    rotate: number[];
    lineHeight: number[];
    xSkrew: number[];
    ySkrew: number[];
    photo: boolean = false;
    pagesForPhoto?: number[];
    photoName?: string[];
    photoPosition: number[];
    width: number[];
    height: number[];
    photoOpacity: number[];
    photoRotate: number[];
}