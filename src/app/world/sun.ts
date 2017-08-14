import {WorldObject} from "./world-object";
import {appHeight, appWidth} from "../util/constants";
import * as d3 from 'd3';

export class Sun extends WorldObject {


    public r: number = 75;
    public isShowing: boolean = false;
    private translateXOffset: number = 4.5 * this.r;
    private translateYOffset: number = 4.5 * this.r;

    initialize(): void {
        this.isShowing = false;
        var cx: number = appWidth + 3 * this.r;
        var cy: number = -3 * this.r;

        this.remove();

        var circle = this.driver.svg.append("circle")
            .attr("class", 'sun')
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", this.r)
            .attr("fill", 'yellow');

    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".sun");
    }

    remove(): void {
        this.getSelection().remove();
    }

    show(): void {
        
        if (!this.isShowing) {
            this.isShowing = true;
            var attributes: { [name: string]: any } = {
                transform: 'translate(-' + this.translateXOffset + ',' + this.translateYOffset + ')'
            };
            this.transitionAttributes(attributes, 1000, d3.easeBounceInOut);

        }
    }

    hide(): void {

        if (this.isShowing) {
            this.isShowing = false;
            var attributes: { [name: string]: any } = {
                transform: 'translate(' + this.translateXOffset + ',-' + this.translateYOffset + ')'
            };
            this.transitionAttributes(attributes, 1000);
        }

    }

}