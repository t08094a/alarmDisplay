import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from '../../shared';
import {
    CommonInfoService,
    CommonInfoPopupService,
    CommonInfoComponent,
    CommonInfoDetailComponent,
    CommonInfoDialogComponent,
    CommonInfoPopupComponent,
    CommonInfoDeletePopupComponent,
    CommonInfoDeleteDialogComponent,
    commonInfoRoute,
    commonInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commonInfoRoute,
    ...commonInfoPopupRoute,
];

@NgModule({
    imports: [
        DataCenterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommonInfoComponent,
        CommonInfoDetailComponent,
        CommonInfoDialogComponent,
        CommonInfoDeleteDialogComponent,
        CommonInfoPopupComponent,
        CommonInfoDeletePopupComponent,
    ],
    entryComponents: [
        CommonInfoComponent,
        CommonInfoDialogComponent,
        CommonInfoPopupComponent,
        CommonInfoDeleteDialogComponent,
        CommonInfoDeletePopupComponent,
    ],
    providers: [
        CommonInfoService,
        CommonInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterCommonInfoModule {}
