import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from '../../shared';
import {
    AlarmInfoService,
    AlarmInfoPopupService,
    AlarmInfoComponent,
    AlarmInfoDetailComponent,
    AlarmInfoDialogComponent,
    AlarmInfoPopupComponent,
    AlarmInfoDeletePopupComponent,
    AlarmInfoDeleteDialogComponent,
    alarmInfoRoute,
    alarmInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...alarmInfoRoute,
    ...alarmInfoPopupRoute,
];

@NgModule({
    imports: [
        DataCenterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlarmInfoComponent,
        AlarmInfoDetailComponent,
        AlarmInfoDialogComponent,
        AlarmInfoDeleteDialogComponent,
        AlarmInfoPopupComponent,
        AlarmInfoDeletePopupComponent,
    ],
    entryComponents: [
        AlarmInfoComponent,
        AlarmInfoDialogComponent,
        AlarmInfoPopupComponent,
        AlarmInfoDeleteDialogComponent,
        AlarmInfoDeletePopupComponent,
    ],
    providers: [
        AlarmInfoService,
        AlarmInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterAlarmInfoModule {}
