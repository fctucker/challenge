import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {Wind} from "../wind";

export class Clear extends Weather {


    transitionIn(): Promise {

        var sky: Sky = <Sky>this.driver.getComponent('sky');
        sky.transitionAttributes({'fill': '#6698FF'}, 1000);

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.hide();

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.show();

        return Promise.all([sky.ready(), sun.ready(), clouds.ready()]);
    }

    getName(): string {
        return 'clear';
    }

    getLabel(): string {
        return 'Clear';
    }

    addParticle(x: number, y: number): void {
        // do nothing, weather is clear
    }

    moveParticles(dx: number, dy: number): void {
        // do nothing, weather is clear
    }

    getWind(): Wind {
        return {forceX: 0, forceY: 0};
    }




}