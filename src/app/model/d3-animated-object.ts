import {D3Object} from "./d3-object";
import {Driver} from "../util/driver";

export abstract class D3AnimatedObject implements D3Object {

    public enabled: boolean = true;

    constructor(public svg: any, public driver: Driver) {
        driver.emitter.subscribe((eventType: string) => {
            if (eventType == 'tick') {
                this.move();
            } else if (eventType == 'reset') {
                this.reset();
            }
        });

        driver.emitter.subscribe((tick: boolean) => {
            this.move();
        })

    }

    abstract move(): void;

    abstract reset(): void;


}