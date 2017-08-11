import {Driver} from "../util/driver";
import {Wind} from "./wind";
import {Transition} from "d3-transition";
import {BaseType} from "d3-selection";
import {appWidth} from "../util/constants";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";

export abstract class Weather {


    public enabled: boolean = false;
    private gravity: {} = {dx: 0, dy: 5};
    // private timer: TimerObservable = null;
    private subscription: Subscription = null;
    private isTransitioningOut: boolean = false;

    constructor(public driver: Driver) {

        this.driver.emitter.subscribe((eventType: string) => {
            var that: Weather = this;
            if (eventType == 'reset') {

            } else if (eventType == 'play') {

            } else if (eventType == 'pause') {

            } else if (eventType == 'changeWeatherType') {

                //TODO: do something interesting

            } else if (eventType == 'tick') {

                if (this.enabled) {


                    var wind: Wind = this.getWind();
                    var dx: number = wind.forceX + this.gravity['dx'];
                    var dy: number = wind.forceY + this.gravity['dy'];
                    this.moveParticles(dx, dy);

                    if (this.isTransitioningOut && this.getNumParticles() < 5) {
                        this.remove();
                        this.isTransitioningOut = false;
                        this.enabled = false;
                        setTimeout(500, () => {
                            that.remove();
                        })
                    }

                    if (!this.isTransitioningOut) {
                        for (var i: number = 0; i < 5; i++) {
                            this.addParticle(Math.floor((Math.random() * 4 * appWidth) - 1.5 * appWidth), 100);
                        }
                    }


                }


            }

        });


    }


    abstract transitionIn(): Promise;


    transitionOut(): void {
        this.isTransitioningOut = true;
    }

    abstract getName(): string;

    abstract getLabel(): string;

    abstract addParticle(x: number, y: number): void;

    abstract moveParticles(dx: number, dy: number): void;

    abstract getWind(): Wind;

    public run(): void {
        this.enabled = true;
    }

    private getSelection(): d3.Selection {
        return this.driver.svg.selectAll('.' + this.getName());
    }

    private remove(): d3.Selection {
        return this.getSelection().remove();
    }

    private getNumParticles(): number {
        return this.getSelection().size();
    }


}
