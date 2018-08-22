/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/common-info/common-info-delete-dialog.component';
import { CommonInfoService } from '../../../../../../main/webapp/app/entities/common-info/common-info.service';

describe('Component Tests', () => {

    describe('CommonInfo Management Delete Component', () => {
        let comp: CommonInfoDeleteDialogComponent;
        let fixture: ComponentFixture<CommonInfoDeleteDialogComponent>;
        let service: CommonInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoDeleteDialogComponent],
                providers: [
                    CommonInfoService
                ]
            })
            .overrideTemplate(CommonInfoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommonInfoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommonInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
