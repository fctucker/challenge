import {Driver} from "../util/driver";

import * as d3 from 'd3';
import {Transition} from "d3-transition";
import {BaseType} from "d3-selection";

export abstract class WorldObject {

    private selection: d3.Selection;
    transition: Transition<BaseType, any, BaseType, any>;
    private lastT: number = 0;
    private transitionArgs: any[] = [];

    constructor(public driver: Driver) {
        var that: WorldObject = this;

        this.driver.emitter.subscribe((eventType: string) => {
            if (eventType == 'reset') {
                that.getSelection().interrupt();
                that.transition = null;
                that.selection = null;
                that.lastT = 0;
                that.initialize();
            } else if (eventType == 'play') {
                that.transitionArgs.forEach((ta: any) => {
                    that.transitionAttributes(ta[0], ta[1], ta[2]);
                });
            } else if (eventType == 'pause') {
                if (that.selection) {
                    that.selection.interrupt();
                    that.lastT = <number>this.selection.attr("T");
                    that.transition = null;
                    that.selection = null;
                }
            } else if (eventType == 'changeWeatherType') {
                that.getSelection().interrupt();
                that.transition = null;
                that.selection = null;
                that.lastT = 0;
            } else if (eventType == 'tick') {

            }

        });
    }

    public abstract initialize(): void;

    public abstract remove(): void;

    public abstract getSelection(): d3.Selection;

    public transitionAttributes(attributes: { [name: string]: any }, duration?: number, ease?: (normalizedTime: number) => number): void {


        var that: WorldObject = this;
        if (!this.transition) {
            this.selection = this.getSelection();
            this.selection.attr("T", 0);
            this.transition = this.selection.transition()
                .on('start', () => {
                    that.transitionArgs.push([attributes, duration, ease]);
                })
                .on('end', () => {
                    that.transitionArgs.shift();
                });
        }

        if (ease) {
            this.transition.ease(this.resumedEase(ease));
        }

        if (duration) {
            this.transition.duration((1 - this.lastT) * duration);
        }

        for (var attr in attributes) {
            this.transition.attr(attr, attributes[attr]);
        }
        this.transition.attr("T", 1);

    }


    private resumedEase(ease: (normalizedTime: number) => number) {

        var that: WorldObject = this;
        return function (x_resumed) {
            var xOriginal = d3.scaleLinear()
                .domain([0, 1])
                .range([that.lastT, 1])
                (x_resumed);
            return d3.scaleLinear()
                .domain([ease(that.lastT), 1])
                .range([0, 1])
                (ease(xOriginal));
        };
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
