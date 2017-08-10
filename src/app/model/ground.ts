import {D3Object} from "./d3-object";
import {appHeight, appWidth} from "../util/constants";

export class Ground implements D3Object {

    id: string;


    width: number = appWidth;
    height: number = 50;
    x: number = 0;
    y: number = appHeight - this.height;
    color: string = '#6E2C00';

    constructor(public svg: any) {

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