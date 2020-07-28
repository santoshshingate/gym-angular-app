import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './Services/Authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gym-Application';
  displayusername="";
  
  constructor( public authservice : AuthenticationService){}

  ngOnInit()
  {
    
    this.displayusername=sessionStorage.getItem("username");
    
  }

  
  

  
  validateForm: FormGroup;

}
