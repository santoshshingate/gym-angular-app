import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authservice:AuthenticationService,private router:Router) { }

canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
{ if(this.authservice.isUserLoggedIn())
  return true;

  this.router.navigate(['login']);
  return false;
}

}
