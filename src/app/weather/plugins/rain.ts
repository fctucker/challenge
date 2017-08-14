import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {appHeight} from "../../util/constants";
import {Ground} from "../../world/ground";

export class Rain extends Weather {

    public dropLen: number = 15;

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


        var x2: number = x;
        var y2: number = y + this.dropLen;


        var forceX: number = this.gravity['dx'] + this.driver.windSpeed * ( (this.driver.windDirection == 'RIGHT') ? 1 : -1 );
        var forceY: number = this.gravity['dy'];
        var theta = Math.atan(forceX / forceY);
        if (!isNaN(theta)) {
            x2 = x + this.dropLen * Math.sin(theta);
            y2 = y + this.dropLen * Math.cos(theta);
        }

        var line = this.driver.svg.append("line")
            .attr('class', this.getName())
            .attr('x1', x)
            .attr('y1', y)
            .attr('x2', x2)
            .attr('y2', y2)

            .attr('stroke', '#034aec')
            .attr('stroke-width', 2)
            .attr('stroke', '#034aec');


    }

    moveParticles(dx: number, dy: number): void {


        var selection: d3.Selection = this.driver.svg.selectAll('.' + this.getName());


        selection.each((d: any, i: number, arr: any[]) => {
            var drop: Element = arr[i];
            var x1: number = parseInt(drop.getAttribute('x1')) + dx;
            var y1: number = parseInt(drop.getAttribute('y1')) + dy;
            var x2: number = parseInt(drop.getAttribute('x2')) + dx;
            var y2: number = parseInt(drop.getAttribute('y2')) + dy;

            var forceX: number = this.gravity['dx'] + this.driver.windSpeed * ( (this.driver.windDirection == 'RIGHT') ? 1 : -1 );
            var forceY: number = this.gravity['dy'];
            var theta = Math.atan(forceX / forceY);
            if (!isNaN(theta)) {
                x2 = x1 + this.dropLen * Math.sin(theta);
                y2 = y1 + this.dropLen * Math.cos(theta);
            }


            if (y2 + dy > appHeight - (<Ground>this.driver.getComponent('ground')).groundLevel) {
                drop.remove();
            } else {
                drop.setAttribute('x1', "" + x1);
                drop.setAttribute('y1', "" + y1);
                drop.setAttribute('x2', "" + x2);
                drop.setAttribute('y2', "" + y2);
            }


        })
    }


}