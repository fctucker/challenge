import {Driver} from "../util/driver";

export abstract class Weather {

    constructor(public driver: Driver) {

    }

    abstract transitionIn(): void;

    abstract transitionOut();

    abstract getName(): string;

    abstract getLabel(): string;


}