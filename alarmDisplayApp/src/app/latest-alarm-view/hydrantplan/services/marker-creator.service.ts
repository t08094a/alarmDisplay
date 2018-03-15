import { Injectable } from '@angular/core';
import { HydrantFeature } from '../hydrant-feature';
import { Marker, marker, icon, Point } from 'leaflet';

@Injectable()
export class MarkerCreatorService {

  constructor() { }

  public mapToHydrantMarker(features: Promise<HydrantFeature[]>): Promise<Marker[]> {
    return features.then(data => {
      return new Promise<Marker[]>((resolve, reject) => {
          const markers: Marker[] = new Array<Marker>();

          const iconSize: Point = new Point(25, 41);
          const anchorPoint: Point = new Point(12, 15); // ausgemittelt
          const shadowPoint: Point = new Point(23, 18); // ausgemittelt

          data.forEach(item => {

            const hydrantType: string = item.tags['fire_hydrant:type'];
            const diameter: string = item.tags['fire_hydrant:diameter'];
            const iconUrl = `../../../assets/hydrant_${hydrantType}_${diameter}.svg`;
            const shadowUrl = iconUrl.replace('.svg', '_shadow.svg');

            try {
              const m = marker([item.lat, item.lon], {
                icon: icon({
                  iconSize: iconSize,
                  iconAnchor: anchorPoint,
                  iconUrl: iconUrl,
                  // shadowUrl: 'leaflet/marker-shadow.png'
                  // shadowUrl: shadowUrl,
                  // shadowAnchor: shadowPoint
                })
              });

              markers.push(m);
            } catch (ex) {
              console.log(`Error: ${(<Error>ex).message}`);
            }
          });

        resolve(markers);
      });
    });
  }
}
