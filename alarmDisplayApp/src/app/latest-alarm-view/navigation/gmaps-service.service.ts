import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs/';

declare var google: any;

@Injectable()
export class GMapsService extends GoogleMapsAPIWrapper {
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
        super(__loader, __zone);
    }

    getLatLng(address: string) {
        console.log('Getting Address - ', address);

        const geocoder = new google.maps.Geocoder();

        return Observable.create(observer => {
            geocoder.geocode({ address: address }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        });
    }
}
