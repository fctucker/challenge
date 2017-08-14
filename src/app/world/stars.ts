import {WorldObject} from "./world-object";

import * as d3 from 'd3';
import {appHeight, appWidth} from "../util/constants";
import {Ground} from "./ground";

export class Stars extends WorldObject {


    public r: number = 1;
    public isShowing: boolean = false;

    initialize(): void {
        this.isShowing = false;

        this.remove();

        for (var i: number = 0; i < 200; i++) {
            var circle = this.driver.svg.append("circle")
                .attr("class", 'stars')
                .attr("cx", Math.floor(Math.random() * appWidth))
                .attr("cy", Math.floor(Math.random() * (appHeight - (<Ground>this.driver.getComponent('ground')).groundLevel)))
                .attr("r", this.r)
                .attr("fill", 'white')
                .attr('opacity', 0);
        }
    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".stars");
    }

    remove(): void {
        this.getSelection().remove();
    }

    show(): void {

        if (!this.isShowing) {
            this.isShowing = true;
            var attributes: { [name: string]: any } = {opacity: 1};
            this.transitionAttributes(attributes, 3000, d3.easeCubic);
        }
    }

    hide(): void {

        if (this.isShowing) {
            this.isShowing = false;
            var attributes: { [name: string]: any } = {opacity: 0};
            this.transitionAttributes(attributes, 500, d3.easeCubic);

        }

    }


}