import {appHeight, appWidth} from "../util/constants";
import {D3AnimatedObject} from "./d3-animated-object";
import {Driver} from "../util/driver";

import * as d3 from 'd3';

export class Cloud extends D3AnimatedObject {

    private width: number = null;
    private height: number = null;
    public r: number = 75;
    private x: number = -this.r + 100;
    private y: number = Math.floor(this.r / 5);
    private color: string = 'gray';
    private id: string = 'abc123';

    private numCirles: number = 20;

    move(): void {
        if (this.enabled) {
            this.svg.selectAll('.cloud')
                .select((d: any, i: number, arr: Element[]) => {
                    var circle: Element = arr[i];
                    var cloudIndex: number = parseInt(circle.getAttribute("cloud-index"));
                    var cx: number = parseInt(circle.getAttribute("cx"));
                    var cy: number = parseInt(circle.getAttribute("cy"));
                    cx += 10;
                    circle.setAttribute('cx', "" + cx);
                })
        }
    }

    reset(): void {
        this.svg.selectAll('.cloud').remove();
        this.draw();
    }


    draw(): void {

        for (var i: number = 0; i < this.numCirles; i++) {
            var rectangle = this.svg.append("circle")
                .attr("class", 'cloud')
                .attr("cloud-index", i)
                .attr("cx", this.x - (i * Math.floor(this.r)))
                .attr("cy", this.y)
                .attr("r", this.r)
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("fill", this.color);
        }

    }


}