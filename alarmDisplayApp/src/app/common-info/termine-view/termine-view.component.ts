import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-termine-view',
    templateUrl: './termine-view.component.html',
    styleUrls: ['./termine-view.component.css']
})
export class TermineViewComponent implements OnInit {

    public events: Event[];

    constructor() {}

    ngOnInit() {
        this.events = [
            {
                title: '1. Termin',
                description: 'Inhalt...',
                date: new Date(2018, 4, 16, 09, 0),
                location: 'Feuerwehr Ipsheim'
            },
            {
                title: '2. Termin',
                description: 'Inhalt...',
                date: new Date(2018, 5, 4, 09, 0)
            }
        ];
    }
}

export interface Event {
    title: string;
    description?: string;
    date: Date;
    location?: string;
}
