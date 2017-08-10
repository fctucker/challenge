import {D3Object} from "./d3-object";
import {Driver} from "../util/driver";

export abstract class D3AnimatedObject implements D3Object {

    constructor(driver: Driver) {
        driver.emitter.subscribe((tick: boolean) => {
            this.move();
        })

    }

    abstract move(): void;


}