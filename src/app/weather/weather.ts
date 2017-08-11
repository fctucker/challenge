import {Driver} from "../util/driver";

export abstract class Weather {

    constructor(public driver: Driver) {

    }

    abstract transistionIn(): void;

    abstract transistionOut();

    abstract getName(): string;

    abstract getLabel(): string;


}