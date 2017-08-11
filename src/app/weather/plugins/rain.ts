import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {Wind} from "../wind";
import {Observable} from "rxjs/Observable";

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

    transitionOut(): void {
    }

    getName(): string {
        return 'rain';
    }

    getLabel(): string {
        return 'Rain';
    }


    addParticle(x: number, y: number): void {

    }

    moveParticle(dx: number, dy: number): void {

    }

    getWind(): Wind {
        return undefined;
    }


}