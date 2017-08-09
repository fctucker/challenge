import {Component, OnDestroy, OnInit} from '@angular/core';


import * as d3 from 'd3';
import $ from 'jquery';

@Component({
    selector: 'my-app',
    template: ``
})
export class AppComponent implements OnInit, OnDestroy {

    constructor() {

    }

    ngOnInit(): void {
        d3.select("body").append("span").text("Hello, world! 123");
    }

    ngOnDestroy(): void {
        console.log('destroy');
    }


}