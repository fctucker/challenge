import {Driver} from "../util/driver";
import {Wind} from "./wind";
import {Transition} from "d3-transition";
import {BaseType} from "d3-selection";

export abstract class Weather {

    constructor(public driver: Driver) {

    }

    abstract transitionIn(): Promise;

    abstract transitionOut(): void;

    abstract getName(): string;

    abstract getLabel(): string;

    abstract addParticle(x: number, y: number): void;

    abstract moveParticle(dx: number, dy: number): void;

    abstract getWind(): Wind;

    public run(): void {
        console.log('RUN!', this.getName());
    }


}
