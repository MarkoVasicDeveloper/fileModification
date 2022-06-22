export class ConvertOptionsDto{
    textOptions?: {
        text: string,
        allPage: boolean,
        position: number[],
        font: string,
        color: number[],
        fontSize: number,
        customPages: {
            text: string,
            position: number[],
            font: string,
            color: number[],
            fontSize: number,
            numberOfPage: number
        }[]
    }
}