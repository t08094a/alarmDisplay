import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';
import { AlarmInfoComponent } from './alarm-info/alarm-info.component';
import { HydrantplanComponent } from './hydrantplan/hydrantplan.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { NavigationComponent } from './navigation/navigation.component';

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
      apiKey: 'AIzaSyCfKS11Jj_0N9kNDHMtNSNGxjGs6pEQxz0'
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
