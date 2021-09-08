import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictPageComponent } from './restrict-page/restrict-page.component';
import { MsalGuard } from './msal.guard';

const routes: Routes = [
  {
    path: 'public-page', component: PublicPageComponent
  },
  {
    path: 'restrict-page', component: RestrictPageComponent, canActivate: [MsalGuard]
  },
  {
    path: '**',component: PublicPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
