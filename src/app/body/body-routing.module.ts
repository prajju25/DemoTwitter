import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileAuthService } from './profile-auth.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [ProfileAuthService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
