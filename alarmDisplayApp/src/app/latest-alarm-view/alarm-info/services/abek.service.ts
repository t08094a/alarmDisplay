import { Observable, ReplaySubject } from 'rxjs/';
import { AlarmItem } from './alarm-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AbekService {

    private dataUrl = '../../../../assets/abek_2016.json';
    private data: Array<AlarmItem> = null;

    constructor(private httpClient: HttpClient) {}

    private extractAbekKey(bemerkung: string): ABekKey {
        const regexp = new RegExp('#([A-Z]+)([0-9]{2})([0-9]{2})#');
        const match = regexp.exec(bemerkung);

        try {
            if (match) {
                const found = match[0];
                const prefix = match[1];
                const hauptgruppe = match[2];
                const untergruppe = match[3];
                const hauptgruppeNr: number = parseInt(hauptgruppe, 10);
                const untergruppeNr: number = parseInt(untergruppe, 10);

                console.log(`extracted ABek Key \"${found}\"`);

                return new ABekKeyImpl(prefix, hauptgruppeNr, untergruppeNr);
            } else {
                console.warn(`unable to extract ABek Key from \"${bemerkung}\"`);
                return new ABekKeyImpl('', 0, 0);
            }
        } catch {
            console.error(`unable to extract ABek Key from \"${bemerkung}\"`);
            return new ABekKeyImpl('', 0, 0);
        }
    }

    private readAllAlarmItems(): Promise<AlarmItem[]> {
        if (this.data != null) {
            return new Promise(resolve => {
                resolve(this.data);
            });
        }

        return this.httpClient.get<AlarmItem[]>(this.dataUrl)
                              .toPromise()
                              .then(data => Promise.resolve(data['data']));
    }

    public getAlarmItem(bemerkung: string): Promise<AlarmItem> {

        return new Promise(resolve => {
            this.readAllAlarmItems().then(result => {
                console.log('AlarmItems loaded ...');

                this.data = result;

                const abekKey = this.extractAbekKey(bemerkung);

                if (abekKey.IsEmpty) {
                    return Promise.reject('Unable to parse ABekKey');
                }

                const found = this.data.find(item => {
                    return item.Prefix === abekKey.Prefix &&
                           item.Hauptgruppe === abekKey.Hauptgruppe &&
                           item.Untergruppe === abekKey.Untergruppe;
                });

                if (found) {
                    resolve(found);
                } else {
                    return Promise.reject('ABek item not found!');
                }
            });
        });
    }

}

interface ABekKey {
    readonly Prefix: string;
    readonly Hauptgruppe: number;
    readonly Untergruppe: number;
    readonly IsEmpty: boolean;
}

class ABekKeyImpl implements ABekKey {
    Prefix: string;
    Hauptgruppe: number;
    Untergruppe: number;
    IsEmpty = false;

    constructor(prefix: string, hauptgruppe: number, untergruppe: number) {
        this.Prefix = prefix;
        this.Hauptgruppe = hauptgruppe;
        this.Untergruppe = untergruppe;

        if (prefix === '' && hauptgruppe === 0 && untergruppe === 0) {
            this.IsEmpty = true;
        }
    }
}
