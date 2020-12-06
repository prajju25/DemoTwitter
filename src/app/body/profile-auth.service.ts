import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileAuthService implements CanActivate {
  
  constructor(private loginService: LoginServiceService, private router: Router){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
  Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if(this.loginService.fetchUserData()){
      return true
    } else {
      return this.router.createUrlTree(['/login']);
    }
    }    
}
