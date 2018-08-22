/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoDetailComponent } from '../../../../../../main/webapp/app/entities/common-info/common-info-detail.component';
import { CommonInfoService } from '../../../../../../main/webapp/app/entities/common-info/common-info.service';
import { CommonInfo } from '../../../../../../main/webapp/app/entities/common-info/common-info.model';

describe('Component Tests', () => {

    describe('CommonInfo Management Detail Component', () => {
        let comp: CommonInfoDetailComponent;
        let fixture: ComponentFixture<CommonInfoDetailComponent>;
        let service: CommonInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoDetailComponent],
                providers: [
                    CommonInfoService
                ]
            })
            .overrideTemplate(CommonInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommonInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommonInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CommonInfo('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.commonInfo).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
