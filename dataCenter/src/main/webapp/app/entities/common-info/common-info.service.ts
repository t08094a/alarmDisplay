import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommonInfo } from './common-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommonInfo>;

@Injectable()
export class CommonInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/common-infos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(commonInfo: CommonInfo): Observable<EntityResponseType> {
        const copy = this.convert(commonInfo);
        return this.http.post<CommonInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(commonInfo: CommonInfo): Observable<EntityResponseType> {
        const copy = this.convert(commonInfo);
        return this.http.put<CommonInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<CommonInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommonInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommonInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommonInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommonInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommonInfo[]>): HttpResponse<CommonInfo[]> {
        const jsonResponse: CommonInfo[] = res.body;
        const body: CommonInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommonInfo.
     */
    private convertItemFromServer(commonInfo: CommonInfo): CommonInfo {
        const copy: CommonInfo = Object.assign({}, commonInfo);
        copy.showStartDate = this.dateUtils
            .convertLocalDateFromServer(commonInfo.showStartDate);
        copy.showEndDate = this.dateUtils
            .convertLocalDateFromServer(commonInfo.showEndDate);
        copy.alarmRelevantStartDate = this.dateUtils
            .convertLocalDateFromServer(commonInfo.alarmRelevantStartDate);
        copy.alarmRelevantEndDate = this.dateUtils
            .convertLocalDateFromServer(commonInfo.alarmRelevantEndDate);
        return copy;
    }

    /**
     * Convert a CommonInfo to a JSON which can be sent to the server.
     */
    private convert(commonInfo: CommonInfo): CommonInfo {
        const copy: CommonInfo = Object.assign({}, commonInfo);
        copy.showStartDate = this.dateUtils
            .convertLocalDateToServer(commonInfo.showStartDate);
        copy.showEndDate = this.dateUtils
            .convertLocalDateToServer(commonInfo.showEndDate);
        copy.alarmRelevantStartDate = this.dateUtils
            .convertLocalDateToServer(commonInfo.alarmRelevantStartDate);
        copy.alarmRelevantEndDate = this.dateUtils
            .convertLocalDateToServer(commonInfo.alarmRelevantEndDate);
        return copy;
    }
}
