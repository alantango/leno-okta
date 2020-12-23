import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import config from './app.config';

import {
  OKTA_CONFIG,
  // OktaAuthGuard,
  OktaAuthModule,
  // OktaCallbackComponent,
} from '@okta/okta-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    AppRoutingModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
