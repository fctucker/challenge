import {D3Object} from "./d3-object";
import {appHeight, appWidth} from "../constants";

export class Sky implements D3Object {

    width: number = appWidth;
    height: number = appHeight;
    x: number = 0;
    y: number = 0;
    color: string = '#6698FF';

    public draw(svg: any): void {
        //Draw the Rectangle
        var rectangle = svg.append("rect")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.color);

    }


}