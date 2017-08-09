import {Component, OnDestroy, OnInit} from '@angular/core';


import * as d3 from 'd3';
import $ from 'jquery';

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
        d3.select("#challenge").append("span").text("Hello, world! 123");
    }

    ngOnDestroy(): void {
        console.log('destroy');
    }


}