import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommonInfo } from './common-info.model';
import { CommonInfoPopupService } from './common-info-popup.service';
import { CommonInfoService } from './common-info.service';

@Component({
    selector: 'jhi-common-info-dialog',
    templateUrl: './common-info-dialog.component.html'
})
export class CommonInfoDialogComponent implements OnInit {

    commonInfo: CommonInfo;
    isSaving: boolean;
    showStartDateDp: any;
    showEndDateDp: any;
    alarmRelevantStartDateDp: any;
    alarmRelevantEndDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private commonInfoService: CommonInfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.commonInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commonInfoService.update(this.commonInfo));
        } else {
            this.subscribeToSaveResponse(
                this.commonInfoService.create(this.commonInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CommonInfo>>) {
        result.subscribe((res: HttpResponse<CommonInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CommonInfo) {
        this.eventManager.broadcast({ name: 'commonInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-common-info-popup',
    template: ''
})
export class CommonInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commonInfoPopupService: CommonInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commonInfoPopupService
                    .open(CommonInfoDialogComponent as Component, params['id']);
            } else {
                this.commonInfoPopupService
                    .open(CommonInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
