import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommonInfo } from './common-info.model';
import { CommonInfoService } from './common-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-common-info',
    templateUrl: './common-info.component.html'
})
export class CommonInfoComponent implements OnInit, OnDestroy {
commonInfos: CommonInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commonInfoService: CommonInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commonInfoService.query().subscribe(
            (res: HttpResponse<CommonInfo[]>) => {
                this.commonInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCommonInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommonInfo) {
        return item.id;
    }
    registerChangeInCommonInfos() {
        this.eventSubscriber = this.eventManager.subscribe('commonInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
