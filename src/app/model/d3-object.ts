export interface D3Object {

    id: string;

    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    svg:any;

    constructor(svg:any):void;

    draw(): void;

}