import {Component, OnDestroy, OnInit} from '@angular/core';


import * as d3 from 'd3';
import $ from 'jquery';
import {BaseType} from "d3-selection";
import {Sky} from "./model/sky";
import {Ground} from "./model/ground";
import {appHeight, appWidth} from "./constants";

@Component({
    selector: 'challenge',
    template: `
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Challenge</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center" style="padding-top: 25px;">
                <div id="challenge"></div>
            </div>
        </div>

    `
})
export class ChallengeComponent implements OnInit, OnDestroy {


    constructor() {

    }

    ngOnInit(): void {
        // d3.select("#challenge").append("span").text("Hello, world! 123");


        //Make an SVG Container
        var svg: any = d3.select("#challenge").append("svg").attr("width", appWidth).attr("height", appHeight);

        // draw the sky
        var sky: Sky = new Sky();
        sky.draw(svg);

        // draw the ground
        var ground: Ground = new Ground();
        ground.draw(svg);

    }

    ngOnDestroy(): void {
        console.log('destroy');
    }


}