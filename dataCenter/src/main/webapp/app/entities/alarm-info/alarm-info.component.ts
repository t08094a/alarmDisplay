import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlarmInfo } from './alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-alarm-info',
    templateUrl: './alarm-info.component.html'
})
export class AlarmInfoComponent implements OnInit, OnDestroy {
alarmInfos: AlarmInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alarmInfoService: AlarmInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.alarmInfoService.query().subscribe(
            (res: HttpResponse<AlarmInfo[]>) => {
                this.alarmInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlarmInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AlarmInfo) {
        return item.id;
    }
    registerChangeInAlarmInfos() {
        this.eventSubscriber = this.eventManager.subscribe('alarmInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
