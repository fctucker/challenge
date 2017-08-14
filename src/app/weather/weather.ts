import {Driver} from "../util/driver";
import {appWidth} from "../util/constants";
import {Subscription} from "rxjs/Subscription";


export abstract class Weather {


    public enabled: boolean = false;
    public gravity: {} = {dx: 0, dy: 5};
    private subscription: Subscription = null;
    private isTransitioningOut: boolean = false;

    constructor(public driver: Driver) {

        this.driver.emitter.subscribe((eventType: string) => {

            if (eventType == 'tick') {
                if (this.enabled) {

                    var dx: number = ((this.driver.windDirection == 'RIGHT') ? 1 : -1) * this.driver.windSpeed + this.gravity['dx'];
                    var dy: number = this.gravity['dy'];
                    this.moveParticles(dx, dy);
                    if (this.isTransitioningOut) {
                        this.isTransitioningOut = false;
                        this.enabled = false;
                        this.remove();
                    }
                    if (!this.isTransitioningOut) {
                        for (var i: number = 0; i < 10; i++) {
                            this.addParticle(Math.floor((Math.random() * 4 * appWidth) - 1.5 * appWidth), 100);
                        }
                    }
                }
            }

        });


    }


    abstract transitionIn(): Promise;


    public transitionOut(): void {
        this.isTransitioningOut = true;
    }

    abstract getName(): string;

    abstract getLabel(): string;

    abstract addParticle(x: number, y: number): void;

    abstract moveParticles(dx: number, dy: number): void;

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
