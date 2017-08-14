import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {appHeight} from "../../util/constants";
import {Ground} from "../../world/ground";

export class Snow extends Weather {

    transitionIn(): Promise {


        var sky: Sky = <Sky>this.driver.getComponent('sky');
        sky.transitionAttributes({'fill': '#a3b0b7'}, 1000);

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.hide();

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.transitionAttributes({'fill': '#e4e8ea'}, 1000);
        clouds.show();

        return Promise.all([sky.ready(), sun.ready(), clouds.ready()]);
    }

    getName(): string {
        return 'snow';
    }

    getLabel(): string {
        return 'Snow';
    }


    addParticle(x: number, y: number): void {

        var circle = this.driver.svg.append("circle")
            .attr('class', this.getName())
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 5)
            .attr('fill', 'white')

    }

    moveParticles(dx: number, dy: number): void {

        var selection: d3.Selection = this.driver.svg.selectAll('.' + this.getName());

        selection.each((d: any, i: number, arr: any[]) => {
            var flake: Element = arr[i];
            var cx: number = parseInt(flake.getAttribute('cx'));
            var cy: number = parseInt(flake.getAttribute('cy'));
            var r: number = parseInt(flake.getAttribute('r'));


            if (cy + r + dy > appHeight - (<Ground>this.driver.getComponent('ground')).groundLevel) {
                flake.remove();
            } else {
                flake.setAttribute('cx', cx + dx);
                flake.setAttribute('cy', cy + dy);
            }
        })
    }


}