/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoComponent } from '../../../../../../main/webapp/app/entities/common-info/common-info.component';
import { CommonInfoService } from '../../../../../../main/webapp/app/entities/common-info/common-info.service';
import { CommonInfo } from '../../../../../../main/webapp/app/entities/common-info/common-info.model';

describe('Component Tests', () => {

    describe('CommonInfo Management Component', () => {
        let comp: CommonInfoComponent;
        let fixture: ComponentFixture<CommonInfoComponent>;
        let service: CommonInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoComponent],
                providers: [
                    CommonInfoService
                ]
            })
            .overrideTemplate(CommonInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommonInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommonInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CommonInfo('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.commonInfos[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
