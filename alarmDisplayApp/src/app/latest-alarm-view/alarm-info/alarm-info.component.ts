import { AlarmContent } from './alarm-content';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alarm-info',
    templateUrl: './alarm-info.component.html',
    styleUrls: ['./alarm-info.component.css']
})
export class AlarmInfoComponent implements OnInit {

    public alarmInfo: AlarmContent;

    constructor() {}

    ngOnInit() {
        this.alarmInfo = {
            Alarmzeit: new Date(2018, 4, 4, 15, 33, 27),
            Einsatzort: 'Am Kuhwasen 2, 91472 Ipsheim',
            Schlagwort: '#B1710#Meldeanlage#Brandmeldeanlage',
            Prioritaet: 1,
            Bemerkung: '51236122-03: 5.1.3 NEA Camp'
        };
    }
}
