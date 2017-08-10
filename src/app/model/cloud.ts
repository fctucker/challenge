import {appHeight, appWidth} from "../util/constants";
import {D3AnimatedObject} from "./d3--animated-object";
import {Driver} from "../util/driver";

export class Cloud extends D3AnimatedObject {
    width: number = null;
    height: number = null;
    public r: number = 75;
    x: number = -this.r + 100;
    y: number = Math.floor(this.r / 5);
    color: string = 'gray';


    move(): void {
        
    }

    draw(svg: any): void {

        //Draw the circle
        var rectangle = svg.append("circle")
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", this.r)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.color);

    }


}