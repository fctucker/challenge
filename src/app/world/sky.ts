import {WorldObject} from "./world-object";
import {appHeight, appWidth} from "../util/constants";
import * as d3 from 'd3';

export class Sky extends WorldObject {


    initialize(): void {
        this.remove();
        var rectangle = this.driver.svg.append("rect")
            .attr("class", "sky")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", appWidth)
            .attr("height", appHeight)
            .attr("fill", '#6698FF');
    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".sky");
    }

    remove(): void {
        this.getSelection().remove();
    }

}