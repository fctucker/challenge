import {Driver} from "../util/driver";

import * as d3 from 'd3';
import {Transition} from "d3-transition";
import {BaseType} from "d3-selection";

export abstract class WorldObject {

    private selection: d3.Selection;
    transition: Transition<BaseType, any, BaseType, any>;

    constructor(public driver: Driver) {
        var that: WorldObject = this;

        this.driver.emitter.subscribe((eventType: string) => {
            if (eventType == 'reset') {
                that.getSelection().interrupt();
                that.transition = null;
                that.selection = null;
                that.initialize();
            } else if (eventType == 'pause') {
                if (that.selection) {
                    that.selection.interrupt();
                    that.transition = null;
                    that.selection = null;
                }
            } else if (eventType == 'changeWeatherType') {
                that.getSelection().interrupt();
                that.transition = null;
                that.selection = null;
            } else if (eventType == 'tick') {

            }

        });
    }

    public abstract initialize(): void;

    public abstract remove(): void;

    public abstract getSelection(): d3.Selection;

    public transitionAttributes(attributes: { [name: string]: any }, duration?: number, ease?: (normalizedTime: number) => number): void {

        if (!this.transition) {
            this.selection = this.getSelection();
            this.selection.attr("T", 0);
            this.transition = this.selection.transition();
        }

        if (ease) {
            this.transition.ease(ease);
        }

        if (duration) {
            this.transition.duration(duration);
        }

        for (var attr in attributes) {
            this.transition.attr(attr, attributes[attr]);
        }

    }


    public ready(): Promise {
        var that: WorldObject = this;
        if (this.transition) {
            return new Promise((resolve) => {
                that.transition.on("end", resolve);
            });
        } else {
            return new Promise((resolve: any) => {
                resolve();
            })
        }

    }
}
