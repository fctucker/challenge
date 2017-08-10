import {EventEmitter, Injectable, OnDestroy, OnInit} from "@angular/core";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class Driver {

    public emitter: EventEmitter<any> = new EventEmitter();
    private timer: TimerObservable;
    private subscription: Subscription;

    constructor() {
        this.timer = new TimerObservable(0, 15);
        this.subscription = this.timer.subscribe((time: number) => {
            this.emitter.emit(true);
        });
    }

    //
    // stopDriver(): void {
    //     // console.log('destroy');
    //     // this.subscription.unsubscribe();
    //     // this.timer = null;
    // }


}
