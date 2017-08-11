import {Driver} from "../util/driver";

import * as d3 from 'd3';
import {Transition} from "d3-transition";
import {BaseType} from "d3-selection";

export abstract class WorldObject {

    private transistion: Transition<BaseType, any, BaseType, any>;

    constructor(public driver: Driver) {
        this.driver.emitter.subscribe((eventType: string) => {
            if (eventType == 'reset') {
                this.initialize();
                this.transistion = null;
            } else if (eventType == 'play') {

            } else if ((eventType == 'pause') || (eventType == 'changeWeatherType')) {
                this.getSelection().interrupt();
                this.transistion = null;
            } else if (eventType == 'tick') {

            }

        });
    }

    public abstract initialize(): void;

    public abstract remove(): void;

    public abstract getSelection(): d3.Selection;

    public transistionAttributes(attributes: { [name: string]: any }, duration?: number): void {

        if (!this.transistion) {
            this.transistion = this.getSelection().transition();
        }

        if (duration) {
            this.transistion.duration(duration)
        }

        for (var attr in attributes) {
            this.transistion.attr(attr, attributes[attr]);
        }

    }


}
