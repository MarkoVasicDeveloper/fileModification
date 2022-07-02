export class ModifyAllPageDto {
    fileName: string;
    addText: boolean = false
    text?: string;
    position: number[];
    font?: string;
    color?: number[];
    fontSize?: number;
    opacity?: number;
    rotate?: number;
    lineHeight?: number;
    xSkrew?: number;
    ySkrew?: number;
    photo: boolean = false;
    photoName?: string;
    photoPosition: number[];
    width: number;
    height: number;
    photoOpacity: number;
    photoRotate: number;
}