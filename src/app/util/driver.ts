import {EventEmitter, Injectable, OnDestroy, OnInit} from "@angular/core";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class Driver {

    public emitter: EventEmitter<any> = new EventEmitter();
    private timer: TimerObservable;
    private subscription: Subscription;

    constructor() {

    }


    start(): void {
        this.timer = new TimerObservable(0, 15);
        this.subscription = this.timer.subscribe((time: number) => {
            this.emitter.emit(true);
        });
    }

    stop(): void {
        this.subscription.unsubscribe();
        this.timer = null;
    }


}
