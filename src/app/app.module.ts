import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ChallengeComponent} from "./challenge.component";
import {AboutComponent} from "./about.component";
import {Driver} from "./util/driver";
import {FormsModule} from "@angular/forms";


const appRoutes: Routes = [
    {path: '', component: ChallengeComponent},
    {path: 'about', component: AboutComponent}
];


@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes),FormsModule],
    providers: [Driver],
    declarations: [AppComponent, ChallengeComponent, AboutComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}