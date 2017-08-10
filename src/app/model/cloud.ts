import {appHeight, appWidth} from "../util/constants";
import {D3AnimatedObject} from "./d3-animated-object";
import {Driver} from "../util/driver";

export class Cloud extends D3AnimatedObject {
    private width: number = null;
    private height: number = null;
    public r: number = 75;
    private x: number = -this.r + 100;
    private y: number = Math.floor(this.r / 5);
    private color: string = 'gray';
    private id: string = 'abc123';

    move(): void {
        if (this.enabled) {
            this.x += 10;
            this.svg.select('#' + this.id)
                .attr("cx", this.x)
                .attr("cy", this.y)
                .attr("r", this.r)

        }
    }

    draw(): void {

        //Draw the circle
        var rectangle = this.svg.append("circle")
            .attr("id", this.id)
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", this.r)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.color);

    }


}