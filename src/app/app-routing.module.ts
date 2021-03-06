import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    // canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ OktaAuthGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
