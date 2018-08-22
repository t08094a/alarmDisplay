import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DataCenterAlarmInfoModule } from './alarm-info/alarm-info.module';
import { DataCenterCommonInfoModule } from './common-info/common-info.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DataCenterAlarmInfoModule,
        DataCenterCommonInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterEntityModule {}
