import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { Login } from 'src/app/Class/Login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  validateForm!: FormGroup;
  admindetails:Login[];
  

  constructor(private router:Router,private authservice:AuthenticationService,private fb: FormBuilder,private logservice:LoginService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    

  
    this.logservice.getLoginDetails().subscribe(data =>{  
      this.admindetails =data;
      console.log(JSON.stringify(data));
      //console.log("api list ::: "+JSON.stringify(this.admindetails[0].uname));
    }) 

    
  }

  // authenticate(username,password)
  // {
  //   if(username === "santosh" && password === "1234")
  //   {
  //     sessionStorage.setItem('username',username);
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }

  // }


  // authenticate(username,password)
  // {
    
  //   if(username == this.admindetails[0].uname && password == this.admindetails[0].password)
  //   {
  //     sessionStorage.setItem('username',username);
  //     return true;
  //   }
  //   else if(username == this.admindetails[1].uname && password == this.admindetails[1].password)
  //   {
  //     sessionStorage.setItem('username',username);
  //     return true;
  //   }
  //   else if(username == this.admindetails[2].uname && password == this.admindetails[2].password)
  //   {
  //     sessionStorage.setItem('username',username);
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }

  // }

  authenticate(username,password)
  {
    for(var i=0;i<=this.admindetails.length;i++)
    {
      if(username == this.admindetails[i].uname && password == this.admindetails[i].password)
      {
        sessionStorage.setItem('username',username);
        return true;
      }
      
       }

  }



  checkLogin()
  {
    if(this.authenticate(this.username,this.password))
    {
      
      this.router.navigate(['view-member'])
      
      this.invalidLogin=false
    }
    else
    
     this.invalidLogin=true
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
