import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  listMenus: Array<Object> = [{
    name: 'Home',
    url: '/home'
  },{
    name: 'Profile',
    url: '/home/profile'
  }];
  isLoggedIn: boolean = false;
  logSub: Subscription;
  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.logSub = this.loginService.isLoggedIn.subscribe((val: boolean)=> this.isLoggedIn = val );
  }

  ngOnDestroy(){
    this.logSub.unsubscribe();
  }

  checkLogOut(){
    if(this.isLoggedIn){
      this.loginService.logout();
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
