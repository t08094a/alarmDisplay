import { CommonInfoItem } from './common-info-item';
export interface CommonInfoItem {
    readonly title: string;
    readonly description?: string;
    readonly showStartDate?: Date;
    readonly showEndDate?: Date;
    readonly alarmRelevant: Boolean;
    readonly alarmRelevantStartDate?: Date;
    readonly alarmRelevantEndDate?: Date;
}

export class CommonInfoItemImpl implements CommonInfoItem {
    public title: string;
    public description?: string;
    public showStartDate?: Date;
    public showEndDate?: Date;
    public alarmRelevant: Boolean;
    public alarmRelevantStartDate?: Date;
    public alarmRelevantEndDate?: Date;
/**
 * Creates an instance of CommonInfoItemImpl.
 * @param {string} title
 * @param {string} [description]
 * @param {Date} [showStartDate]
 * @param {Date} [showEndDate]
 * @param {Date} [alarmRelevantStartDate]
 * @param {Date} [alarmRelevantEndDate]
 * @memberof CommonInfoItemImpl
 */
constructor(title: string, description?: string,
                showStartDate?: Date, showEndDate?: Date,
                alarmRelevantStartDate?: Date, alarmRelevantEndDate?: Date) {
        this.title = title;
        this.description = description;
        this.showStartDate = showStartDate != null ? showStartDate : new Date(-8640000000000000);
        this.showEndDate = showEndDate != null ? showEndDate : new Date(8640000000000000);
        this.alarmRelevant = alarmRelevantStartDate != null || alarmRelevantEndDate != null;
        this.alarmRelevantStartDate = alarmRelevantStartDate;
        this.alarmRelevantEndDate = alarmRelevantEndDate;
    }
}
