import { CommonInfoItem, CommonInfoItemImpl } from './common-info-item';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-view',
    templateUrl: './info-view.component.html',
    styleUrls: ['./info-view.component.css']
})
export class InfoViewComponent implements OnInit {
    public items: CommonInfoItem[];

    constructor() {}

    ngOnInit() {
        this.items = [
            new CommonInfoItemImpl('T1', 'd1'),
            new CommonInfoItemImpl('T2', 'd1', new Date('2018-04-01'), new Date('2018-05-01')),
            new CommonInfoItemImpl('T3', 'd1', new Date('2018-04-01'), new Date('2018-04-27')),
            new CommonInfoItemImpl('T4', 'd1', new Date('2018-04-01'), new Date('2018-05-01')),
            new CommonInfoItemImpl('T5', 'd1', new Date('2018-04-01'), new Date('2018-05-27')),
            new CommonInfoItemImpl('T6', 'd1', new Date('2018-04-01'), new Date('2018-05-06'))
        ].filter(this.filterInfoItemsToDateRelevant())
        .sort(this.ortInfoItemsByDate());
    }

    private ortInfoItemsByDate() {
        return (item1, item2) => {
            if ((item1.showEndDate === null || item1.showEndDate === undefined) &&
                (item2.showEndDate === null || item2.showEndDate === undefined)) {

                return 0;
            }

            if (item1.showEndDate === null || item1.showEndDate === undefined) {
                return -1;
            }

            if (item2.showEndDate === null || item2.showEndDate === undefined) {
                return 1;
            }

            const item1Time = item1.showEndDate.getTime();
            const item2Time = item2.showEndDate.getTime();
            if (item1Time < item2Time) {
                return 1;
            } else if (item1Time > item2Time) {
                return 1;
            }

            return 0;
        };
    }

    private filterInfoItemsToDateRelevant() {
        return item => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            if ((item.showStartDate === null || item.showStartDate === undefined ||
                 item.showStartDate.getTime() <= now.getTime()) &&
                (item.showEndDate === null || item.showEndDate === undefined ||
                 item.showEndDate.getTime() >= now.getTime())) {

                return true;
            }

            return false;
        };
    }
}
