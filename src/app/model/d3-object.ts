export interface D3Object {


    width: number;
    height: number;
    x: number;
    y: number;
    color: string;

    draw(svg: any): void;

}