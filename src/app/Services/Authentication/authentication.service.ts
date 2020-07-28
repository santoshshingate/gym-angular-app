import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  

 

  isUserLoggedIn()
  {
    let user = sessionStorage.getItem('username');
    //console.log(!(user === null));
    return !(user === null);
  }

  logout()
  {
    sessionStorage.removeItem('username');
    
  }
}
