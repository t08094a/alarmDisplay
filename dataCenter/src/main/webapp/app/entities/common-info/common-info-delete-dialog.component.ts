import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommonInfo } from './common-info.model';
import { CommonInfoPopupService } from './common-info-popup.service';
import { CommonInfoService } from './common-info.service';

@Component({
    selector: 'jhi-common-info-delete-dialog',
    templateUrl: './common-info-delete-dialog.component.html'
})
export class CommonInfoDeleteDialogComponent {

    commonInfo: CommonInfo;

    constructor(
        private commonInfoService: CommonInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.commonInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commonInfoListModification',
                content: 'Deleted an commonInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-common-info-delete-popup',
    template: ''
})
export class CommonInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commonInfoPopupService: CommonInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commonInfoPopupService
                .open(CommonInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
