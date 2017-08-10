import {Component, OnDestroy, OnInit} from '@angular/core';


import * as d3 from 'd3';
import $ from 'jquery';
import {BaseType} from "d3-selection";
import {Sky} from "./model/sky";
import {Ground} from "./model/ground";
import {appHeight, appWidth} from "./util/constants";
import {Cloud} from "./model/cloud";
import {Driver} from "./util/driver";

@Component({
    selector: 'challenge',
    template: `
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Challenge</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 text-center" style="padding-top: 10px;">
                <button class="btn btn-info" (click)="toggleState()">{{stateLabel}}&nbsp;&nbsp;&nbsp;<i class="fa" [ngClass]="stateClass" ></i></button>
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


    public stateClass:string = 'fa-play';
    public stateLabel:string = 'Play';
    public state:string = 'PAUSED';

    constructor(public driver: Driver) {

    }

    ngOnInit(): void {
        // d3.select("#challenge").append("span").text("Hello, world! 123");


        //Make an SVG Container
        var svg: any = d3.select("#challenge").append("svg").attr("width", appWidth).attr("height", appHeight);

        // draw the sky
        var sky: Sky = new Sky(svg);
        sky.draw();

        // draw the ground
        var ground: Ground = new Ground(svg);
        ground.draw();

        // draw the cloud
        var cloud: Cloud = new Cloud(svg,this.driver);
        cloud.draw();

    }

    ngOnDestroy(): void {
        console.log('destroy');
    }

    toggleState(){
        if(this.state=='PAUSED'){
            this.stateLabel = 'Pause';
            this.stateClass = 'fa-pause';
            this.state = 'PLAYING';
            this.driver.start();
        }else{
            this.stateLabel = 'Play';
            this.stateClass = 'fa-play';
            this.state = 'PAUSED';
            this.driver.stop();
        }
    }


}