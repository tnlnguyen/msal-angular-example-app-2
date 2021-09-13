import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  apiResponse: string = '';

  constructor(private msalService: MsalService, private httpClient: HttpClient){

  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account)
      }
    })
  }

  isLoggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  getName() {
    if (this.msalService.instance.getActiveAccount()) {
      return this.msalService.instance.getActiveAccount()?.name;
    } else return 'Unknown';
  }

  getMail() {
    if (this.msalService.instance.getActiveAccount()) {
      return this.msalService.instance.getActiveAccount()?.username;
    } else return 'Unknown';
  }

  getTenantId() {
    if (this.msalService.instance.getActiveAccount()) {
      return this.msalService.instance.getActiveAccount()?.tenantId;
    } else return 'Unknown';
  }

  getProfile() {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe((res) => {
      this.apiResponse = JSON.stringify(res);
    });
  }

  getActiveAccount() {
    this.apiResponse = JSON.stringify(this.msalService.instance.getActiveAccount());
  }

  getWeather() {
    this.httpClient.get('http://localhost:5000/api/weatherforecast').subscribe((res) => {
      this.apiResponse = JSON.stringify(res);
    });
  }
}
