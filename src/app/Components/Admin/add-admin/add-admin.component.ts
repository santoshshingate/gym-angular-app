import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/Class/Login/login';
import { LoginService } from 'src/app/Services/Login/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { observable, Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  validateAdminUpdate!: FormGroup;
  validateAdminDelete!:FormGroup;

  submitForm(): void {
    for (const i in this.validateAdminUpdate.controls) {
      this.validateAdminUpdate.controls[i].markAsDirty();
      this.validateAdminUpdate.controls[i].updateValueAndValidity();
    }
  }

  submitForm1(): void {
    for (const i in this.validateAdminDelete.controls) {
      this.validateAdminDelete.controls[i].markAsDirty();
      this.validateAdminDelete.controls[i].updateValueAndValidity();
    }
  }

 

  login: Login = new Login();
  validateForm:FormGroup;
  submitted = false;
  adminlist:Login[];
  AdminData:any;
  adminlistnew:Login[];
  NewPassword:any;
  Admins:Observable<Login[]>;
  OldPassword:any;
  isupdated=false;
  deleteMessage=false;
  isupdatednew=false;
  isVisible=false;
  unamePattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"; 
  
  constructor(private loginservice: LoginService, private fb: FormBuilder,private modalService: NzModalService) { }

  ngOnInit(): void {
    this.validateForm= this.fb.group({

      admin_name: [null, [Validators.required]],
      admin_pass: [null, [Validators.required]]
     
    })

    this.validateAdminUpdate = this.fb.group({

      login_id:[null, [Validators.required]],
      admin_username: [null, [Validators.required]],
      admin_p: [null, [Validators.required]],
      
      admin_old_pass: [null, [Validators.required,this.confirmationValidator]],
      admin_new_pass: [null, [Validators.required]]

    })
    this.validateAdminDelete = this.fb.group({

      login_id:[null, [Validators.required]],
  
      admin_p: [null, [Validators.required]],
      
      admin_old_pass: [null, [Validators.required,this.confirmationValidator]]
      

    })
    console.log("inside oninit");


    
//get admin list
    this.loginservice.getLoginDetails().subscribe(
      data=>{
        this.adminlist=data;
        console.log(data);
      }
    )
  }

  

  //logic for updating password

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateAdminUpdate.controls.admin_old_pass.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateAdminUpdate.controls.admin_p.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  updateAdmin(logid: number){  
  
    this.loginservice.getAdmin(logid)  
      .subscribe(  
        data => {  
          console.log(data);
          this.AdminData=Array.of(data)          
        },  
        error => console.log(error));  
  }

  UpdateAdmin(updadmin){  
    this.submitForm();
    this.login=new Login(); 
    this.login.logid= this.Ad_Id.value;   
    this.login.uname= this.Ad_Name.value;
    this.login.password= this.Ad_New_Password.value;
    
  
    // console.log(this.T_Type.value);  
     
  
   this.loginservice.updateAdmin(this.login.logid,this.login).subscribe(  
    data => {       
      this.isupdated=true;  
      this.loginservice.getLoginDetails().subscribe(data =>{  
        this.adminlistnew =data  
        console.log("data check "+ data)
        })  
    },  
    error => console.log(error));  
    
  }


  // delete admin
  deleteAdmin(logid: number) { 
     this.submitForm1();
    this.loginservice.deleteAdmin(logid)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.loginservice.getLoginDetails().subscribe(data =>{  
            this.Admins =data  
            })  
        },  
        error => console.log(error)); 
        window.location.reload();
  }  

  showDeleteConfirm(logid): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure ?',
      nzContent: '<b style="color: red;">Once deleted cannot be recovered</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteAdmin(logid),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  success(): void {
    const modal = this.modalService.success({
      //nzTitle: 'This is a notification message',
      nzContent: 'Admin added successfully!!!!'
    });

    setTimeout(() => modal.destroy(), 3000);
  }

  save() {  
    console.log(JSON.stringify(this.login))
    this.loginservice.createAdmin(this.login)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.login = new Login();  
  } 

  saveAdmin(){  
    this.login=new Login();     
    this.login.uname=this.Admin_Name.value;  
    this.login.password=this.Admin_Password.value;  
    this.submitted = true;  
    this.save();  
    window.location.reload();
  }  
  
  get Admin_Name(){  
    return this.validateForm.get('admin_name');  
  }  
  
  get Admin_Password(){  
    return this.validateForm.get('admin_pass');  
  }  

  get Ad_Id(){  
    return this.validateAdminUpdate.get('login_id');  
  }

  get Ad_Name(){  
    return this.validateAdminUpdate.get('admin_username');  
  }  
  
  get Ad_Password(){  
    return this.validateAdminUpdate.get('admin_p');  
  }  


  get Ad__Old_Password(){  
    return this.validateAdminUpdate.get('admin_old_pass');  
  }  
  
  get Ad_New_Password(){  
    return this.validateAdminUpdate.get('admin_new_pass');  
  } 
 
  changeisUpdate(){  
    this.isupdated=false;  
    window.location.reload();
  } 
  changeisUpdateNew(){  
    this.isupdatednew=false;  
    window.location.reload();
  } 
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  
}
