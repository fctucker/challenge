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
            <div class="col-md-4 text-center" style="padding-top: 10px;">
                
            </div>
            <div class="col-md-7 text-right" style="padding-top: 10px;">
                <button class="btn" [ngClass]="btnClass" (click)="toggleState()">{{stateLabel}}&nbsp;&nbsp;&nbsp;<i
                        class="fa" [ngClass]="iconClass"></i></button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-info" (click)="reset()">Reset&nbsp;&nbsp;&nbsp;<i class="fa fa-refresh"></i>
                </button>
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


    public iconClass: string = 'fa-play';
    public btnClass: string = 'btn-success';
    public stateLabel: string = 'Play';
    public state: string = 'PAUSED';


    constructor(public driver: Driver) {

    }

    ngOnInit(): void {

        //Make an SVG Container
        var svg: any = d3.select("#challenge").append("svg").attr("width", appWidth).attr("height", appHeight);

        // draw the sky
        var sky: Sky = new Sky(svg);
        sky.draw();

        // draw the ground
        var ground: Ground = new Ground(svg);
        ground.draw();

        // draw the cloud
        var cloud: Cloud = new Cloud(svg, this.driver);
        cloud.draw();

    }

    ngOnDestroy(): void {
        console.log('destroy');
    }

    toggleState(): void {
        if (this.state == 'PAUSED') {
            this.stateLabel = 'Pause';
            this.iconClass = 'fa-pause';
            this.btnClass = 'btn-danger';
            this.state = 'PLAYING';
            this.driver.start();
        } else {
            this.stateLabel = 'Play';
            this.iconClass = 'fa-play';
            this.btnClass = 'btn-success';
            this.state = 'PAUSED';
            this.driver.stop();
        }
    }

    reset(): void {
        this.driver.reset();
    }


}