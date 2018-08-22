/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataCenterTestModule } from '../../../test.module';
import { AlarmInfoDetailComponent } from '../../../../../../main/webapp/app/entities/alarm-info/alarm-info-detail.component';
import { AlarmInfoService } from '../../../../../../main/webapp/app/entities/alarm-info/alarm-info.service';
import { AlarmInfo } from '../../../../../../main/webapp/app/entities/alarm-info/alarm-info.model';

describe('Component Tests', () => {

    describe('AlarmInfo Management Detail Component', () => {
        let comp: AlarmInfoDetailComponent;
        let fixture: ComponentFixture<AlarmInfoDetailComponent>;
        let service: AlarmInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [AlarmInfoDetailComponent],
                providers: [
                    AlarmInfoService
                ]
            })
            .overrideTemplate(AlarmInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlarmInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlarmInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AlarmInfo('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.alarmInfo).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
