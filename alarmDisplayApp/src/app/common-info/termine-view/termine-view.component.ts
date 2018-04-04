import { EventItem } from './event-item';
import { EventService } from './event-service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-termine-view',
    templateUrl: './termine-view.component.html',
    styleUrls: ['./termine-view.component.css']
})
export class TermineViewComponent implements OnInit {

    public events: EventItem[] = [];

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        const startDate = new Date();
        this.eventService.getEvents(startDate, 5)
            .then(evts => {
                this.events = evts;
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error.error);
            });
    }
}
