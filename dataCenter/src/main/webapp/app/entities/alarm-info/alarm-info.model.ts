import { BaseEntity } from './../../shared';

export class AlarmInfo implements BaseEntity {
    constructor(
        public id?: string,
        public time?: any,
        public location?: string,
        public geoposition?: string,
        public keywords?: string,
        public comment?: string,
        public priority?: number,
    ) {
    }
}
