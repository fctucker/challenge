import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";

export class Clear extends Weather {


    transitionIn() {

        var sky: Sky = <Sky>this.driver.getComponent('sky');
        sky.transitionAttributes({'fill': '#6698FF'}, 1000);

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.hide();

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.show();


    }

    transitionOut() {
    }

    getName(): string {
        return 'clear';
    }

    getLabel(): string {
        return 'Clear';
    }

}