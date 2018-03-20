import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { AlarmInfoComponent } from './latest-alarm-view/alarm-info/alarm-info.component';
import { HydrantplanComponent } from './latest-alarm-view/hydrantplan/hydrantplan.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { NavigationComponent } from './latest-alarm-view/navigation/navigation.component';
import { OverpassService } from './latest-alarm-view/hydrantplan/services/overpass.service';
import { MarkerCreatorService } from './latest-alarm-view/hydrantplan/services/marker-creator.service';
import { environment } from '../environments/environment.prod';
import { LatestAlarmViewComponent } from './latest-alarm-view/latest-alarm-view.component';
import { InfoViewComponent } from './common-info/info-view/info-view.component';
import { TermineViewComponent } from './common-info/termine-view/termine-view.component';
import { EventService } from './common-info/termine-view/event-service';

@NgModule({
  declarations: [
    AppComponent,
    AlarmInfoComponent,
    HydrantplanComponent,
    CommonInfoComponent,
    NavigationComponent,
    LatestAlarmViewComponent,
    InfoViewComponent,
    TermineViewComponent
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
    MarkerCreatorService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
