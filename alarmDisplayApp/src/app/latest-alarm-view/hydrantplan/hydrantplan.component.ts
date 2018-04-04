import { Component, OnInit } from '@angular/core';
import {
    icon,
    latLng,
    Map,
    marker,
    point,
    polyline,
    tileLayer,
    TileLayer,
    LeafletEvent,
    LeafletMouseEvent,
    Popup,
    Layer,
    Marker,
    LayerGroup,
    circle,
    layerGroup,
    MapOptions
} from 'leaflet';
import { OverpassService } from './services/overpass.service';
import { MarkerCreatorService } from './services/marker-creator.service';

@Component({
    selector: 'app-hydrantplan',
    templateUrl: './hydrantplan.component.html',
    styleUrls: ['./hydrantplan.component.css']
})
export class HydrantplanComponent implements OnInit {
    public title = 'Hydrantenplan';

    private zoomLevel = 17;

    private googleMaps: TileLayer = tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            detectRetina: true
        }
    );

    private openStreetMap: TileLayer = tileLayer(
        'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        {
            attribution: '',
            detectRetina: true,
            maxZoom: 18
        }
    );

    private ziel: Marker = marker([49.527352, 10.487624], {
        icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
        })
    });

    private radiusCircle = circle(this.ziel.getLatLng(), {
        radius: 100
    });

    layersControl = {
        baseLayers: {
            'Google Maps': this.googleMaps,
            OpenStreetMap: this.openStreetMap
        },
        overlays: {
            Ziel: this.ziel,
            Einsatzradius: this.radiusCircle
        }
    };

    options: MapOptions = {
        layers: [this.openStreetMap, this.ziel, this.radiusCircle],
        zoom: 15,
        center: latLng([49.526558948981595, 10.483931601047516]),
        zoomControl: null
    };

    private map: Map;

    constructor(
        private overpassService: OverpassService,
        private markerCreator: MarkerCreatorService
    ) {}

    ngOnInit() {}

    public onMapReady(map: Map): void {
        this.map = map;

        map.setView(this.ziel.getLatLng(), this.zoomLevel);

        this.radiusCircle.setLatLng(this.ziel.getLatLng());

        this.markerCreator
            .mapToHydrantMarker(
                this.overpassService.getHydrantMarkers(map.getBounds())
            )
            .then(m => {
                const group = new LayerGroup(m);
                map.addLayer(group);
                this.layersControl.overlays['Hydranten'] = group;
            })
            .catch(error => console.log(error));

        if (!map.hasEventListeners('click')) {
            map.addEventListener('click', this.onClick);
        }
    }

    public onClick(event: LeafletMouseEvent): void {
        console.log(event.latlng);
    }
}
