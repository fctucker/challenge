import {EventEmitter, Injectable, OnDestroy, OnInit} from "@angular/core";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";
import {Ground} from "../world/ground";
import {WorldObject} from "../world/world-object";
import {Weather} from "../weather/weather";


@Injectable()
export class Driver {


    public emitter: EventEmitter<any> = new EventEmitter();
    private timer: TimerObservable;
    private subscription: Subscription;
    public svg: d3.Selection;

    private components: { [name: string]: WorldObject } = {};
    private weatherTypes: { [name: string]: Weather } = {};

    constructor() {

    }

    play(): void {
        this.timer = new TimerObservable(0, 10);
        this.subscription = this.timer.subscribe((time: number) => {
            this.emitter.emit('tick');
        });
        this.emitter.emit('play');
    }

    pause(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.timer = null;
        this.emitter.emit('pause');
    }

    reset(): void {
        this.emitter.emit('reset');
    }

    triggerChangeWeatherTypeEvent(): void {
        this.emitter.emit('changeWeatherType');
    }


    addComponent(component: WorldObject, name: string): void {
        component.initialize();
        this.components[name] = component;
    }

    getComponent(name: string): WorldObject {
        return this.components[name];
    }

    addWeatherType(weatherType: Weather): void {
        this.weatherTypes[weatherType.getName()] = weatherType;
    }

    getWeatherType(name: string): Weather {
        return this.weatherTypes[name];
    }

    getWeatherTypes(): Weather[] {
        var output: Weather[] = [];
        for (var key in this.weatherTypes) {
            output.push(this.weatherTypes[key]);
        }
        return output;
    }
}
