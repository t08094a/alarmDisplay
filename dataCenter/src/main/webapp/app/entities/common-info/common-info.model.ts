import { BaseEntity } from './../../shared';

export class CommonInfo implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public showStartDate?: any,
        public showEndDate?: any,
        public alarmRelevant?: boolean,
        public alarmRelevantStartDate?: any,
        public alarmRelevantEndDate?: any,
    ) {
        this.alarmRelevant = false;
    }
}
