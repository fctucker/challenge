import {Component} from '@angular/core';


@Component({
    selector: 'challenge',
    template: `
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>About</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1 text-left" style="padding-top: 25px;">

                <h2>In-browser Particle System</h2>
                <div>
                    <p>We are developing a simple side scrolling in-browser game and we need a flexible engine for
                        controlling particle systems. We need you to author a Javascript and HTML-based implementation
                        of a basic 2d engine that can simulate different kinds of particles. Your solution must
                        implement at least two of the following simulation types to demonstrate its extensibility:</p>
                    <ul>
                        <li>Snow blowing and falling</li>
                        <li>Rain falling</li>
                        <li>Leaves tumbling down</li>
                        <li>A swarm of insects</li>
                    </ul>
                    <p>We have provided some basic requirements [1] for your solution, so please review these
                        carefully.</p>
                    <h3>[1] Requirements</h3>
                    <ul>
                        <li>The system should draw a pane that is at least 400&#215;400.</li>
                        <li>You must allow the user to play and pause the simulation.</li>
                        <li>You must allow the user to toggle between two simulation modes (eg. snow vs rain).</li>
                        <li>The solution must be extensible to adding more simulation types.</li>
                        <li>The simulation must be capable of running indefinitely.</li>
                    </ul>
                    <p>Be creative and incorporate your own effects and style. Also, there is nothing wrong with
                        leveraging any of the common open source frameworks for building web pages and
                        visualizations.</p>
                </div>

            </div>
        </div>

    `
})
export class AboutComponent {

    constructor() {

    }


}