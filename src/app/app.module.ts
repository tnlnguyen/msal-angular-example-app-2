import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictPageComponent } from './restrict-page/restrict-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '1e0c0be0-488b-4eae-855f-d38247f5b85f',
      redirectUri: 'https://pet-app2.azurewebsites.net/',
      authority: 'https://login.microsoftonline.com/2988af91-a14f-4260-8bb9-7f1e092df981'
    },
    cache: {
      cacheLocation: 'localStorage',
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  protectedResourceMap.set('http://localhost:5000/api/weatherforecast', ['api://42e59693-12e9-4907-86d7-ccd2f6f88ec4/weather.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    RestrictPageComponent
  ],
  imports: [
    BrowserModule,
    MsalModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
