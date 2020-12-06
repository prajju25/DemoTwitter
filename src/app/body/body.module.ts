import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BodyRoutingModule } from './body-routing.module';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    BodyRoutingModule
  ],
  exports: [BodyRoutingModule, HomeComponent, ProfileComponent]
})
export class BodyModule { }
