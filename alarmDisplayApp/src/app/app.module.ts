import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { AlarmInfoComponent } from './alarm-info/alarm-info.component';
import { HydrantplanComponent } from './hydrantplan/hydrantplan.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OverpassService } from './hydrantplan/services/overpass.service';
import { MarkerCreatorService } from './hydrantplan/services/marker-creator.service';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    AlarmInfoComponent,
    HydrantplanComponent,
    CommonInfoComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmDirectionModule,
    LeafletModule.forRoot()
  ],
  providers: [
    OverpassService,
    MarkerCreatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
