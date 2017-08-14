import {Component, OnDestroy, OnInit} from '@angular/core';


import * as d3 from 'd3';
import {appHeight, appWidth} from "./util/constants";
import {Driver} from "./util/driver";
import {Ground} from "./world/ground";
import {Sky} from "./world/sky";
import {Clouds} from "./world/clouds";
import {Rain} from "./weather/plugins/rain";
import {Weather} from "./weather/weather";
import {Sun} from "./world/sun";
import {Clear} from "./weather/plugins/clear";
import {Snow} from "./weather/plugins/snow";


@Component({
    selector: 'challenge',
    template: `
        <div class="row">
            <div class="col-md-3 text-left col-md-offset-1" style="padding-top: 10px;">


                <label class="radio" *ngFor="let w of weatherTypes">
                    <input type="radio" name="weather-type" id="{{w.getName()}}"
                           value="{{w.getName()}}" [disabled]="state!='PLAYING'"
                           [(ngModel)]="weatherTypeName" (change)="changeWeatherType()">
                    {{w.getLabel()}}
                </label>
            </div>
            <div class="col-md-2 text-center" style="padding-top: 10px;">
                Wind Speed
                <input id="wind-speed" type="range" min="0" max="50" step="1" [(ngModel)]="windSpeed"
                       (change)="changeWind()"/>
            </div>
            <div class="col-md-2 text-text-left" style="padding-top: 10px;">
                Wind Direction
                <label class="radio">
                    <input type="radio" name="wind-direction" id="wind-left" value="LEFT" [disabled]="state!='PLAYING'"
                           [(ngModel)]="windDirection" (change)="changeWind()">
                    Left
                </label>
                <label class="radio">
                    <input type="radio" name="wind-direction" id="wind-right" value="RIGHT"
                           [disabled]="state!='PLAYING'"
                           [(ngModel)]="windDirection" (change)="changeWind()">
                    Right
                </label>
            </div>

            <div class="col-md-4 text-right" style="padding-top: 10px;">
                <button [disabled]="isTransitining" class="btn" [ngClass]="btnClass" (click)="toggleState()">{{stateLabel}}&nbsp;&nbsp;&nbsp;<i
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
    public weatherTypeName: string = 'clear';
    public weatherTypes: Weather[] = [];
    public weatherType: Weather = null;
    public retriggerWeather: boolean = false;
    public isTransitining: boolean = false;

    public windSpeed: number = 0;
    public windDirection: string = 'RIGHT';


    constructor(public driver: Driver) {

    }

    ngOnInit(): void {

        //Make an SVG Container
        this.driver.svg = <d3.Selection>d3.select("#challenge").append("svg").attr("width", appWidth).attr("height", appHeight);
        this.driver.addComponent(new Sky(this.driver), 'sky');
        this.driver.addComponent(new Ground(this.driver), 'ground');
        this.driver.addComponent(new Clouds(this.driver), 'clouds');
        this.driver.addComponent(new Sun(this.driver), 'sun');


        this.driver.addWeatherType(new Clear(this.driver));
        this.driver.addWeatherType(new Rain(this.driver));
        this.driver.addWeatherType(new Snow(this.driver));

        this.weatherTypes = this.driver.getWeatherTypes();
        this.weatherTypeName = this.weatherTypes[0].getName();

        this.retriggerWeather = true;
        this.play();


    }

    ngOnDestroy(): void {
        this.reset();
    }

    toggleState(): void {
        if (this.state == 'PAUSED') {
            this.play();
        } else {
            this.pause();
        }
    }


    play(): void {
        this.stateLabel = 'Pause';
        this.iconClass = 'fa-pause';
        this.btnClass = 'btn-danger';
        this.state = 'PLAYING';
        this.driver.play();
        if (this.retriggerWeather) {
            this.retriggerWeather = false;
            this.changeWeatherType();
        }
        this.weatherType.enabled = true;
    }

    pause(): void {
        this.stateLabel = 'Play';
        this.iconClass = 'fa-play';
        this.btnClass = 'btn-success';
        this.state = 'PAUSED';
        this.driver.pause();
        this.weatherType.enabled = false;
    }

    reset(): void {
        this.pause();
        this.driver.reset();
        this.retriggerWeather = true;
        this.isTransitining = false;
        this.weatherType.enabled = false;
    }


    changeWeatherType(): void {

        if (this.state == 'PLAYING') {
            this.isTransitining = true;
            this.driver.triggerChangeWeatherTypeEvent();
            var newWeatherType: Weather = this.driver.getWeatherType(this.weatherTypeName);
            if (this.weatherType != null) {
                this.weatherType.transitionOut();
            }
            this.weatherType = newWeatherType;
            this.weatherType.transitionIn().then(() => {
                this.isTransitining = false;
                this.weatherType.enabled = true;
                this.weatherType.run();

            });


        }
    }

    changeWind(): void {
        // this.driver.setWind(this.windDirection, this.windSpeed);
        console.log('wind', this.windDirection, this.windSpeed);
        this.driver.windSpeed = this.windSpeed;
        this.driver.windDirection = this.windDirection;
    }


}