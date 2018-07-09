import { HydrantFeature } from './../hydrant-feature';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class OverpassService {

  private url = 'http://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) { }

  public getHydrantMarkers(bounds: LatLngBounds): Promise<HydrantFeature[]> {
    const bbox = bounds.toBBoxString();

    console.log(`query with bbox "${bbox}"`);

    const queryData = `data=[bbox:49.513005485733,10.476408004761,49.537241053134,10.500955581665][out:json][timeout:25];\n` +
                  '(\n' +
                    `node[\"emergency\"=\"fire_hydrant\"];\n` +
                    // `node[\"emergency\"=\"water_tank\"];\n` +

                    // `node[\"emergency\"=\"fire_water_pond\"];\n` +
                    // `area[\"emergency\"=\"fire_water_pond\"];\n` +
                    // `relation[\"emergency\"=\"fire_water_pond\"];\n` +

                    // `node[\"emergency\"=\"suction_point\"];\n` +
                  ');\n' +
                'out body;\n' +
                '>;\n' +
                'out skel qt;';

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(this.url, queryData, httpOptions)
             .toPromise()
             .then(data => {
                console.log('Data returned: ', data);
                return data['elements'];
              }
             )
             .catch(error => {
                console.log(error);
                return Promise.reject(error.error);
              });
  }
}
