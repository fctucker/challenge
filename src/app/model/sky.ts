import {D3Object} from "./d3-object";
import {appHeight, appWidth} from "../util/constants";

export class Sky implements D3Object {
    id: string;


    width: number = appWidth;
    height: number = appHeight;
    x: number = 0;
    y: number = 0;
    color: string = '#6698FF';

    constructor(public svg:any){

    }


    public draw(): void {
        //Draw the Rectangle
        var rectangle = this.svg.append("rect")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.color);

    }


}