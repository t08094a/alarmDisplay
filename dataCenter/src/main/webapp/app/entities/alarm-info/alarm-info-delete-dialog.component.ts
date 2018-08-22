import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlarmInfo } from './alarm-info.model';
import { AlarmInfoPopupService } from './alarm-info-popup.service';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info-delete-dialog',
    templateUrl: './alarm-info-delete-dialog.component.html'
})
export class AlarmInfoDeleteDialogComponent {

    alarmInfo: AlarmInfo;

    constructor(
        private alarmInfoService: AlarmInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.alarmInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alarmInfoListModification',
                content: 'Deleted an alarmInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alarm-info-delete-popup',
    template: ''
})
export class AlarmInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alarmInfoPopupService: AlarmInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alarmInfoPopupService
                .open(AlarmInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
