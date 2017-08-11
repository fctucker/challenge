import {WorldObject} from "./world-object";
import {appHeight, appWidth} from "../util/constants";
import * as d3 from 'd3';

export class Ground extends WorldObject {

    public groundLevel: number = 50;

    initialize(): void {
        this.remove();
        var rectangle = this.driver.svg.append("rect")
            .attr("class", "ground")
            .attr("x", 0)
            .attr("y", appHeight - this.groundLevel)
            .attr("width", appWidth)
            .attr("height", this.groundLevel)
            .attr("fill", '#9b7653');
    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".ground");
    }

    remove(): void {
        this.getSelection().remove();
    }

}