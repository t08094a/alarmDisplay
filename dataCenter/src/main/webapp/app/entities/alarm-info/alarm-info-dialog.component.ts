import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlarmInfo } from './alarm-info.model';
import { AlarmInfoPopupService } from './alarm-info-popup.service';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info-dialog',
    templateUrl: './alarm-info-dialog.component.html'
})
export class AlarmInfoDialogComponent implements OnInit {

    alarmInfo: AlarmInfo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alarmInfoService: AlarmInfoService,
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
        if (this.alarmInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alarmInfoService.update(this.alarmInfo));
        } else {
            this.subscribeToSaveResponse(
                this.alarmInfoService.create(this.alarmInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlarmInfo>>) {
        result.subscribe((res: HttpResponse<AlarmInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AlarmInfo) {
        this.eventManager.broadcast({ name: 'alarmInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-alarm-info-popup',
    template: ''
})
export class AlarmInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alarmInfoPopupService: AlarmInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alarmInfoPopupService
                    .open(AlarmInfoDialogComponent as Component, params['id']);
            } else {
                this.alarmInfoPopupService
                    .open(AlarmInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
