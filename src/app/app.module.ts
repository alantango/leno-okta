import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import config from './app.config';

import {
  OKTA_CONFIG,
  // OktaAuthGuard,
  OktaAuthModule,
  // OktaCallbackComponent,
} from '@okta/okta-angular';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
