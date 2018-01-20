import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';
import { AlarmInfoComponent } from './alarm-info/alarm-info.component';
import { HydrantplanComponent } from './hydrantplan/hydrantplan.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { NavigationComponent } from './navigation/navigation.component';
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
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
