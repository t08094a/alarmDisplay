import { EventItem } from './event-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) {}

    public getEvents(startDate: Date, count: number): Promise<EventItem[]> {
        const events: EventItem[] = [
            {
                title: '1. Termin',
                description: 'Inhalt...',
                date: new Date(2018, 4, 16, 9, 0),
                location: 'Feuerwehr Ipsheim'
            },
            {
                title: '2. Termin',
                description: 'Inhalt...',
                date: new Date(2018, 5, 4, 9, 0)
            }
        ];

        return Promise.all(events);
    }
}
