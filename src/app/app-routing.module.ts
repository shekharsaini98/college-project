import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './components/header/register/register.component';
import {LoginComponent} from './components/header/login/login.component';
import {WelcomepageComponent} from './components/body/welcomepage/welcomepage.component';
import {AuthGuardGuard} from './Security/auth-guard.guard';
import {ProfileComponent} from './components/body/profile/profile.component';

import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {CareersComponent} from "./components/careers/careers.component";
import {FeesNchargesComponent} from "./components/fees-ncharges/fees-ncharges.component";
import {ResolverService} from "./services/resolver.service";

const routes: Routes = [

  {path: 'register', component: RegisterComponent},
  {path: 'log-in', component: LoginComponent},

  {path: 'Profile', component: ProfileComponent, canActivate: [AuthGuardGuard], resolve: {user: ResolverService}},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'careers', component: CareersComponent},
  {path: 'feesNcharges', component: FeesNchargesComponent},
  {path: '', component: WelcomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
