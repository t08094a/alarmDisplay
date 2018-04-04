import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = environment.applicationTitle;
    appVersion = environment.VERSION;

    public constructor(private titleService: Title) {
        this.titleService.setTitle(environment.applicationTitle);
    }
}
