import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AlarmInfo } from './alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info-detail',
    templateUrl: './alarm-info-detail.component.html'
})
export class AlarmInfoDetailComponent implements OnInit, OnDestroy {

    alarmInfo: AlarmInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alarmInfoService: AlarmInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlarmInfos();
    }

    load(id) {
        this.alarmInfoService.find(id)
            .subscribe((alarmInfoResponse: HttpResponse<AlarmInfo>) => {
                this.alarmInfo = alarmInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlarmInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alarmInfoListModification',
            (response) => this.load(this.alarmInfo.id)
        );
    }
}
