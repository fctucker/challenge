import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";

export class Rain extends Weather {


    transistionIn() {
        var sky: Sky = <Sky>this.driver.getComponent('sky');
        sky.transistionAttributes({'fill': '#90C9DD'}, 1000);

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.hide();

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.transistionAttributes({'fill': '#B6B6B4'}, 1000);
        clouds.show();


    }

    transistionOut() {
    }

    getName(): string {
        return 'rain';
    }

    getLabel(): string {
        return 'Rain';
    }

}