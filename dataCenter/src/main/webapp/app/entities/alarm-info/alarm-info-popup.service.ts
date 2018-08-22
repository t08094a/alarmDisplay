import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlarmInfo } from './alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';

@Injectable()
export class AlarmInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private alarmInfoService: AlarmInfoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alarmInfoService.find(id)
                    .subscribe((alarmInfoResponse: HttpResponse<AlarmInfo>) => {
                        const alarmInfo: AlarmInfo = alarmInfoResponse.body;
                        alarmInfo.time = this.datePipe
                            .transform(alarmInfo.time, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.alarmInfoModalRef(component, alarmInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alarmInfoModalRef(component, new AlarmInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alarmInfoModalRef(component: Component, alarmInfo: AlarmInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.alarmInfo = alarmInfo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
