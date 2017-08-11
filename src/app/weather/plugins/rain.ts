import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {Wind} from "../wind";
import {Observable} from "rxjs/Observable";
import {selection} from "d3-selection";
import {appHeight} from "../../util/constants";
import {Ground} from "../../world/ground";

export class Rain extends Weather {


    transitionIn(): Promise {


        var sky: Sky = <Sky>this.driver.getComponent('sky');
        sky.transitionAttributes({'fill': '#90C9DD'}, 1000);

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.hide();

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.transitionAttributes({'fill': '#B6B6B4'}, 1000);
        clouds.show();

        return Promise.all([sky.ready(), sun.ready(), clouds.ready()]);
    }


    getName(): string {
        return 'rain';
    }

    getLabel(): string {
        return 'Rain';
    }


    addParticle(x: number, y: number): void {


        var line = this.driver.svg.append("line")
            .attr('class', this.getName())
            .attr('x1', x)
            .attr('y1', y)
            .attr('x2', x + 15)
            .attr('y2', y + 15)
            .attr('stroke', '#034aec')
            .attr('stroke-width', 2)
            .attr('stroke', '#034aec');


    }

    moveParticles(dx: number, dy: number): void {

        var selection: d3.Selection = this.driver.svg.selectAll('.' + this.getName());

        selection.each((d: any, i: number, arr: any[]) => {
            var drop: Element = arr[i];
            var x1: number = parseInt(drop.getAttribute('x1'));
            var y1: number = parseInt(drop.getAttribute('y1'));
            var x2: number = parseInt(drop.getAttribute('x2'));
            var y2: number = parseInt(drop.getAttribute('y2'));


            if (y1 + dy > appHeight - (<Ground>this.driver.getComponent('ground')).groundLevel) {
                drop.remove();
            } else {
                drop.setAttribute('x1', x1 + dx);
                drop.setAttribute('y1', y1 + dy);
                drop.setAttribute('x2', x2 + dx);
                drop.setAttribute('y2', y2 + dy);
            }


        })
    }

    getWind(): Wind {
        return {
            forceX: 5,
            forceY: 0
        };
    }


}