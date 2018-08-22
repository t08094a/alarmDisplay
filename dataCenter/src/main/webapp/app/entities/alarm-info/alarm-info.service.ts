import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AlarmInfo } from './alarm-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlarmInfo>;

@Injectable()
export class AlarmInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/alarm-infos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(alarmInfo: AlarmInfo): Observable<EntityResponseType> {
        const copy = this.convert(alarmInfo);
        return this.http.post<AlarmInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alarmInfo: AlarmInfo): Observable<EntityResponseType> {
        const copy = this.convert(alarmInfo);
        return this.http.put<AlarmInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<AlarmInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlarmInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<AlarmInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlarmInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlarmInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AlarmInfo[]>): HttpResponse<AlarmInfo[]> {
        const jsonResponse: AlarmInfo[] = res.body;
        const body: AlarmInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AlarmInfo.
     */
    private convertItemFromServer(alarmInfo: AlarmInfo): AlarmInfo {
        const copy: AlarmInfo = Object.assign({}, alarmInfo);
        copy.time = this.dateUtils
            .convertDateTimeFromServer(alarmInfo.time);
        return copy;
    }

    /**
     * Convert a AlarmInfo to a JSON which can be sent to the server.
     */
    private convert(alarmInfo: AlarmInfo): AlarmInfo {
        const copy: AlarmInfo = Object.assign({}, alarmInfo);

        copy.time = this.dateUtils.toDate(alarmInfo.time);
        return copy;
    }
}
