import {Weather} from "../weather";
import {Sky} from "../../world/sky";
import {Clouds} from "../../world/clouds";
import {Sun} from "../../world/sun";
import {appWidth} from "../../util/constants";
import {Driver} from "../../util/driver";
import {WorldObject} from "../../world/world-object";
import * as d3 from 'd3';
import {Stars} from "../../world/stars";

export class Eclipse extends Weather {

    constructor(public driver: Driver) {

        super(driver);
        this.driver.addComponent(new EclipseMoon(this.driver), 'eclipse-moon');

    }

    transitionIn(): Promise {

        var stars: Stars = <Stars>this.driver.getComponent('stars');
        stars.show();

        var sun: Sun = <Sun>this.driver.getComponent('sun');
        sun.show();

        var clouds: Clouds = <Clouds>this.driver.getComponent('clouds');
        clouds.hide();

        var moon: EclipseMoon = <EclipseMoon>this.driver.getComponent('eclipse-moon');
        moon.show();


        return Promise.all([sun.ready(), clouds.ready(), moon.ready(), stars.ready]);
    }

    public transitionOut(): void {
        this.isTransitioningOut = true;
        var moon: EclipseMoon = <EclipseMoon>this.driver.getComponent('eclipse-moon');
        moon.hide();

        var stars: Stars = <Stars>this.driver.getComponent('stars');
        stars.hide();
    }

    getName(): string {
        return 'elcipse';
    }

    getLabel(): string {
        return 'Eclipse';
    }


    addParticle(x: number, y: number): void {

        // nothing to do clear sky
    }

    moveParticles(dx: number, dy: number): void {

        // nothing to do clear sky
    }


}


export class EclipseMoon extends WorldObject {


    public r: number = 75;
    public isShowing: boolean = false;
    private translateXOffset: number = 4.5 * this.r;


    initialize(): void {

        this.isShowing = false;
        var cx: number = appWidth + 3 * this.r;
        var cy: number = -3 * this.r + 4.5 * this.r - 1;

        this.remove();

        var circle = this.driver.svg.append("circle")
            .attr("class", 'eclipse-moon')
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", this.r - 1)
            .attr("fill", 'black');

    }

    getSelection(): d3.Selection {
        return this.driver.svg.selectAll(".eclipse-moon");
    }

    remove(): void {
        this.getSelection().remove();
    }

    show(): void {

        if (!this.isShowing) {
            this.isShowing = true;
            var attributes: { [name: string]: any } = {
                transform: 'translate(-' + this.translateXOffset + ',0)'
            };
            this.transitionAttributes(attributes, 3000, d3.easeLinear);

            var sky: Sky = <Sky>this.driver.getComponent('sky');
            sky.transitionAttributes({'fill': 'black'}, 5000);
        }
    }

    hide(): void {

        if (this.isShowing) {
            this.isShowing = false;
            var attributes: { [name: string]: any } = {
                transform: 'translate(' + this.translateXOffset + ',0)'
            };
            this.transitionAttributes(attributes, 1000);
        }

    }


}

