import {WorldObject} from "./world-object";
import {appHeight, appWidth} from "../util/constants";
import * as d3 from 'd3';

export class Clouds extends WorldObject {

    public r: number = 75;
    public numCirles: number = appWidth / this.r;
    public translateOffset: number = appWidth + this.r;
    public isShowing: boolean = false;


    initialize(): void {

        var cx: number = appWidth - this.r;
        var cy: number = Math.floor(this.r / 5);

        this.remove();
        for (var i: number = 0; i < this.numCirles; i++) {
            var circle = this.driver.svg.append("circle")
                .attr("class", 'clouds')
                .attr("cx", cx - appWidth - Math.floor((5 / 4) * this.r) * i)
                .attr("cy", cy)
                .attr("r", this.r)
                .attr("fill", 'white');
        }
    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".clouds");
    }

    remove(): void {
        this.getSelection().remove();
    }

    show(): void {
        if (!this.isShowing) {
            this.isShowing = true;
            var attributes: { [name: string]: any } = {
                transform: 'translate(' + this.translateOffset + ',0)'
            };
            this.transistionAttributes(attributes, 1000);
        }
    }

    hide(): void {
        if (this.isShowing) {
            this.isShowing = false;
            var attributes: { [name: string]: any } = {
                transform: 'translate(-' + this.translateOffset + ',0)'
            };
            this.transistionAttributes(attributes, 1000);
        }

    }

}