import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CommonInfo } from './common-info.model';
import { CommonInfoService } from './common-info.service';

@Injectable()
export class CommonInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private commonInfoService: CommonInfoService

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
                this.commonInfoService.find(id)
                    .subscribe((commonInfoResponse: HttpResponse<CommonInfo>) => {
                        const commonInfo: CommonInfo = commonInfoResponse.body;
                        if (commonInfo.showStartDate) {
                            commonInfo.showStartDate = {
                                year: commonInfo.showStartDate.getFullYear(),
                                month: commonInfo.showStartDate.getMonth() + 1,
                                day: commonInfo.showStartDate.getDate()
                            };
                        }
                        if (commonInfo.showEndDate) {
                            commonInfo.showEndDate = {
                                year: commonInfo.showEndDate.getFullYear(),
                                month: commonInfo.showEndDate.getMonth() + 1,
                                day: commonInfo.showEndDate.getDate()
                            };
                        }
                        if (commonInfo.alarmRelevantStartDate) {
                            commonInfo.alarmRelevantStartDate = {
                                year: commonInfo.alarmRelevantStartDate.getFullYear(),
                                month: commonInfo.alarmRelevantStartDate.getMonth() + 1,
                                day: commonInfo.alarmRelevantStartDate.getDate()
                            };
                        }
                        if (commonInfo.alarmRelevantEndDate) {
                            commonInfo.alarmRelevantEndDate = {
                                year: commonInfo.alarmRelevantEndDate.getFullYear(),
                                month: commonInfo.alarmRelevantEndDate.getMonth() + 1,
                                day: commonInfo.alarmRelevantEndDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.commonInfoModalRef(component, commonInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.commonInfoModalRef(component, new CommonInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    commonInfoModalRef(component: Component, commonInfo: CommonInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.commonInfo = commonInfo;
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
