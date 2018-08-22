import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CommonInfo } from './common-info.model';
import { CommonInfoService } from './common-info.service';

@Component({
    selector: 'jhi-common-info-detail',
    templateUrl: './common-info-detail.component.html'
})
export class CommonInfoDetailComponent implements OnInit, OnDestroy {

    commonInfo: CommonInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commonInfoService: CommonInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommonInfos();
    }

    load(id) {
        this.commonInfoService.find(id)
            .subscribe((commonInfoResponse: HttpResponse<CommonInfo>) => {
                this.commonInfo = commonInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommonInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commonInfoListModification',
            (response) => this.load(this.commonInfo.id)
        );
    }
}
