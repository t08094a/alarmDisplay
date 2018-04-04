import { environment } from './../../../../environments/environment';
import { EventItem } from './../event-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Queries events form google calendar.
 *
 * @export
 * @class EventService
 */
@Injectable()
export class EventService {

    private _endpoint = 'https://www.googleapis.com/calendar/v3/calendars/';
    private _calendarId = encodeURIComponent('nba5ul4kfa3q1ukhukqme7q870@group.calendar.google.com');
    private _apiKey = environment.googleMapsKey;

    constructor(private httpClient: HttpClient) {}

    public getEvents(startDate: Date, maxResults: number): Promise<EventItem[]> {
        // clear time and behold the date
        // tslint:disable-next-line:max-line-length
        const todayAtMidn = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay(), 0, -1 * startDate.getTimezoneOffset(), 0);
        const timeMin = encodeURIComponent(todayAtMidn.toISOString());

        // tslint:disable-next-line:max-line-length
        const options = `?maxResults=${maxResults}&orderBy=startTime&showDeleted=false&showHiddenInvitations=false&singleEvents=true&timeMin=${timeMin}&key=${this._apiKey}`;
        const url = `${this._endpoint}${this._calendarId}/events${options}`;

        const promise = new Promise<EventItem[]>((resolve, reject) => {
            this.httpClient.get<EventItem[]>(url)
                        .map(this.mapItems)
                        .toPromise()
                        .then(data => {
                            resolve(data);
                            })
                        .catch(error => {
                            console.log(error);
                            return Promise.reject(error.error);
                        });
        });

        return promise;
    }

    private mapItems(value: any, index: number): EventItem[] {
        const items: EventItem[] = [];

        value['items'].forEach(element => {
            items.push({
                title: element['summary'],
                description: element['description'],
                date: element['start']['dateTime'],
                location: element['location']
            });
        });

        return items;
    }
}
