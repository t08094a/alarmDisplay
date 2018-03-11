import { MarkerCreatorService } from './services/marker-creator.service';
import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { icon, latLng, Map, marker, point, polyline, tileLayer, TileLayer, LeafletEvent, LeafletMouseEvent, Popup, Layer, Marker, LayerGroup } from 'leaflet';
import { OverpassService } from './services/overpass.service';

@Component({
  selector: 'app-hydrantplan',
  templateUrl: './hydrantplan.component.html',
  styleUrls: ['./hydrantplan.component.css']
})
export class HydrantplanComponent implements OnInit {

  public title = 'Hydrantenplan';

  googleMaps: TileLayer = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  openStreetMap: TileLayer = tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    attribution: '',
    detectRetina: true,
    maxZoom: 18
  });

  ziel: Marker = marker([49.527352, 10.487624], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '../../assets/red-marker-icon.png',
      // iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  start: Marker = marker([49.526558948981595, 10.483931601047516], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  route = polyline([
    [49.526558948981595, 10.483931601047516],
    [49.527352, 10.487624]
  ]);

  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'OpenStreetMap': this.openStreetMap
    },
    overlays: {
      'Ziel': this.ziel,
      'Start': this.start,
      'Route': this.route
    }
  };

  options = {
    layers: [this.openStreetMap, this.route, this.ziel, this.start],
    zoom: 15,
    center: latLng([49.526558948981595, 10.483931601047516])
  };

  private map: Map;

  constructor(private overpassService: OverpassService,
              private markerCreator: MarkerCreatorService) {
  }

  ngOnInit() {}

    public onMapReady(map: Map): void {
    this.map = map;

    const bounds = this.route.getBounds();

    map.fitBounds(bounds, {
      padding: point(24, 24),
      maxZoom: 17,
      animate: true
    });

    this.markerCreator.mapToHydrantMarker(this.overpassService.getHydrantMarkers(bounds))
        .then(m => {
          const group = new LayerGroup(m);
          console.log(this.layersControl.overlays);
          map.addLayer(group);
        })
        .catch(error => console.log(error));

    if (!map.hasEventListeners('click')) {
      map.addEventListener('click', this.onClick);
    }
  }

  public onClick(event: LeafletMouseEvent ): void {
    console.log(event.latlng);
  }
}
