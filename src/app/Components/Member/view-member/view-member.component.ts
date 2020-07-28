import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Class/Member/member';  
import {MemberService} from 'src/app/Services/Member/member.service'
import { Observable,Subject } from "rxjs";  
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Training } from 'src/app/Class/Training/training';
import { TrainingService } from 'src/app/Services/Training/training.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';



@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit {
  selectedTraining:any;
  fees:number;
  selectedPlan:0;
  selectedTrainingName:string;
  displayusername:String;

  constructor(private memberservice:MemberService,private message:NzMessageService,private modal:NzModalService,private router:Router,private trainingservice:TrainingService,public authservice:AuthenticationService) { }


  membersArray: any[] = [];  
  members: Observable<Member[]>; 
  member:Member=new Member();
  membercount: any;
  memc:Member[];
  deleteMessage=false;  
  memberslist:any;
  isupdated = false;
  isVisible=false;
  types:Training[];
  

  submitted=false;
  training:Training=new Training();


  searchText;

  ngOnInit(): void {
    
    console.log("inside oninit");
    this.memberservice.getMembers().subscribe(data =>{  
      this.members =data;
      
      console.log(data);
    }) 

    


    
    this.memberservice.getCount().subscribe(data=>
      {
        this.membercount=data;
        console.log(JSON.stringify(data));

      })
      console.log("inside oninit");
      this.trainingservice.getTypeList().subscribe(data =>{  
        this.types =data;
        console.log(data);
        console.log("api list ::: "+JSON.stringify(this.types));
      })

      this.displayusername=sessionStorage.getItem("username");
      
}




// showMessages():void
// {
// this.message.loading('Action in Progress',{nzDuration:2500})
// .onClose!.pipe(
//   concatMap(() => this.message.success('Deleted Successfully', { nzDuration: 2500 }).onClose!))
// }

// To show confirm modal before delete
showDeleteConfirm(mem_id): void {
  this.modal.confirm({
    nzTitle: 'Are you sure delete this member?',
    nzContent: '<b style="color: red;">Once deleted cannot be recovered</b>',
    nzOkText: 'Yes',
    nzOkType: 'danger',
    nzOnOk: () => this.deleteMember(mem_id),
    nzCancelText: 'No',
    nzOnCancel: () => console.log('Cancel')
  });
  
}

changeTraining(selectedTraining){
  
  console.log(`selected training ::: ${JSON.stringify(selectedTraining)}`);
  this.selectedTrainingName = selectedTraining.training_type;
  console.log(`training type :::${this.selectedTrainingName}`);
  if(this.selectedPlan){
    this.fees = selectedTraining[this.selectedPlan];
  }
}

changePlan(selectedPlan){
  console.log(`selected plan ::: ${selectedPlan}`);
  console.log(`selected training ::: ${JSON.stringify(this.selectedTraining)}`);
  if(this.selectedTraining){
    this.fees = this.selectedTraining[selectedPlan];
  }

}


deleteMember(mem_id: number) {  
  this.memberservice.deleteMember(mem_id)  
    .subscribe(  
      data => {  
        console.log(data);  
        this.deleteMessage=true;  
        this.memberservice.getMemberList().subscribe(data =>{  
          this.members =data  
          })  
      },  
      error => console.log(error)); 
      window.location.reload();      
}  

updateMember(mem_id: number){ 

  this.isVisible=true;
  this.memberservice.getMember(mem_id)  
    .subscribe(  
      data => {  
        console.log(data);
        this.memberslist=Array.of(data)          
      },  
      error => console.log(error));
        
}  
 
// updateMember(mem_id) {
//   this.memberservice.getMember(mem_id).subscribe(data => {
//     console.log(data);  
//     this.memberlist = data;
      
//   });
// }


memberupdateform=new FormGroup({  
  
  mem_id:new FormControl(),  
  mem_name:new FormControl(),  
  mem_address:new FormControl(),  
  mem_contact:new FormControl(),
  mem_dob:new FormControl(),  
  mem_start_date:new FormControl(), 
  mem_end_date:new FormControl(), 
  mem_training:new FormControl(),
  mem_plan:new FormControl(),   
  mem_amount:new FormControl()
});  

updateMem(updmem){  
  this.member=new Member(); 
  this.member.mem_id= this.MemberId.value;   
  this.member.name=this.MemberName.value;  
  this.member.address=this.MemberAddress.value;  
  this.member.dob=this.MemberDob.value;
  this.member.contact=this.MemberContact.value;
  this.member.start_date=this.MemberStart_Date.value;  
  this.member.end_date=this.MemberEnd_Date.value;  
  this.member.training = this.selectedTrainingName;
  this.member.plan=this.Plan.value;
  this.member.amount=this.MemberAmount.value;
  window.location.reload();
 console.log(this.MemberName.value);  
   

 this.memberservice.updateMember(this.member.mem_id,this.member).subscribe(  
  data => {       
    this.isupdated=true;  
    this.memberservice.getMemberList().subscribe(data =>{  
      this.members =data  
      
      })  
  },  
  error => console.log(error));  
  
}  


get MemberId(){  
  return this.memberupdateform.get('mem_id');  
}  

get MemberName(){  
  return this.memberupdateform.get('mem_name');  
}  

get MemberAddress(){  
  return this.memberupdateform.get('mem_address');  
}  

get MemberDob(){  
  return this.memberupdateform.get('mem_dob');  
}  

get MemberContact(){  
  return this.memberupdateform.get('mem_contact');  
} 

get MemberStart_Date(){  
  return this.memberupdateform.get('mem_start_date');  
} 

get MemberEnd_Date(){  
  return this.memberupdateform.get('mem_end_date');  
} 

get MemberTraining(){  
  return this.memberupdateform.get('mem_training');  
} 

get Plan(){  
  return this.memberupdateform.get('mem_plan');  
} 

get MemberAmount(){  
  return this.memberupdateform.get('mem_amount');  
} 
changeisUpdate(){  
  this.isupdated=false;  
}
handleCancel(): void {
  this.isVisible = false;
} 

}

