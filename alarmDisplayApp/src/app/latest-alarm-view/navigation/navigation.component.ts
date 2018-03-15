import { Component, NgZone, NgModule, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper,  LatLngLiteral,   MouseEvent,   MapsAPILoader} from '@agm/core';
import { } from 'googlemaps';
import { GMapsService } from './gmaps-service.service';
// import {} from 'agm-direction';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ GMapsService ]
})
export class NavigationComponent implements OnInit {

  public title = 'Einsatz Navigation';
  public zoom = 17;
  public dir = undefined;

  private origin = { lat: 49.526558948981595, lng: 10.483931601047516};
  private address = 'Am Schießwasen 2, 91438 Bad Windsheim';

  constructor(private mapsAPILoader: MapsAPILoader,
    private gMapsService: GMapsService,
    private __zone: NgZone) { }

  ngOnInit() {
    // load places autocomplete
    this.mapsAPILoader.load().then(() => {
        this.renderDirections();
    });
  }

  ngOnChange() {
      this.renderDirections();
  }

  renderDirections() {
    this.gMapsService.getLatLng(this.address)
      .subscribe(
        result => {
            this.__zone.run(() => {
                const destinationLatLng = {lat: result.lat(), lng: result.lng()};

                console.log(`LatLng for ${this.address}: ${destinationLatLng}`);

                this.dir = {
                    origin: this.origin,
                    destination: destinationLatLng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
            });
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }

  onMapClicked(event: MouseEvent) {
      console.log(event.coords);
  }
}
