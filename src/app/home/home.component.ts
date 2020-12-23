import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  infobag: any;
  userName: string;
  error:Error;

  constructor(private oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    console.log('....authState subscribed');
  }

  async ngOnInit() {
    console.log('...ngOnInit...');
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('...oktaAuth returned ' + this.isAuthenticated);
    if (this.isAuthenticated) {
      console.log('...getting user');
      const userClaims = await this.oktaAuth.getUser();
      console.log('user claim returned');
      this.infobag = {
        accessToken: this.oktaAuth.getAccessToken(),
        idToken: this.oktaAuth.getIdToken(),
        issuerOrigin: this.oktaAuth.getIssuerOrigin(),
        config: this.oktaAuth.getOktaConfig(),
        user: userClaims
      };

      this.userName = userClaims.name;
    }
  }

  async login() {
    try {
      await this.oktaAuth.signInWithRedirect();
    } catch (err) {
      console.error(err);
      this.error = err;
    }
  }

  async logout() {
    this.oktaAuth.signOut();
  }

}

