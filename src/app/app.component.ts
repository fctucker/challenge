import {Component, OnDestroy, OnInit} from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
        <!-- Fixed navbar -->

        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" routerLink="/">Challenge</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a routerLink="/" routerLinkActive="active"
                               routerLinkActiveOptions="{exact:true}">Challenge</a></li>
                        <li><a routerLink="/about" routerLinkActive="active" routerLinkActiveOptions="{exact:true}">About</a>
                        </li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <router-outlet></router-outlet>


        <footer class="footer-no-nav navbar-static-bottom text-center" role="contentinfo" style="margin-bottom: 15px; margin-top: 25px;">
            Frederick C. Tucker (f.c.tucker.09@gmail.com)
        </footer>

    `
})
export class AppComponent {

    constructor() {

    }

}