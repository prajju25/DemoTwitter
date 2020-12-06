import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},{
  path: 'home',
  loadChildren: './body/body.module#BodyModule'
},{
  path: 'login',
  loadChildren: './login/login.module#LoginModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
