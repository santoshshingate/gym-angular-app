import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';  
import { Member } from 'src/app/Class/Member/member';  

import {MemberService} from 'src/app/Services/Member/member.service' 
import { TrainingService } from 'src/app/Services/Training/training.service';
import { Training } from 'src/app/Class/Training/training';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  validateForm: FormGroup;
  dateFormat="yyyy/MM/dd";

  selectedTraining:any;
  selectedPlan:0;
  fees=0;
  selectedTrainingName:string;
  constructor(private memberservice:MemberService,private fb: FormBuilder,private trainingservice:TrainingService) { }
  
  member : Member=new Member();  
  types:Training[];
  

  submitted=false;
  training:Training=new Training();

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      member_name: new FormControl('', [ Validators.required]),
      member_address: [null, [ Validators.required]],
      member_contact: [null, [ Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      member_contactPrefix: ['+91'],
      member_dob: [null, [ Validators.required]],

      member_start_date: [null, [ Validators.required]],
      member_end_date: [null, [ Validators.required]],  
      member_training: [null, [ Validators.required]],
      member_plan: [null, [ Validators.required]],
      member_amount:[null, [ Validators.required]]
});

console.log("inside oninit");
this.trainingservice.getTypeList().subscribe(data =>{  
  this.types =data;
  console.log(data);
  console.log("api list ::: "+JSON.stringify(this.types));
}) 

}


changeTraining(selectedTraining){
  
  console.log(`selected training ::: ${JSON.stringify(selectedTraining)}`);
  this.selectedTrainingName = selectedTraining.training_type;
  console.log(`trainging type ${this.selectedTrainingName}`);
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

  saveMember(saveMember){  
    this.member=new Member();     
    this.member.name=this.MemberName.value;  
    this.member.address=this.MemberAddress.value;  
    this.member.dob=this.MemberDob.value;
    this.member.contact=this.MemberContact.value;
    this.member.start_date=this.MemberStart_Date.value;  
    this.member.end_date=this.MemberEnd_Date.value;  
    //this.member.training=this.MemberTraining.value;
    this.member.training = this.selectedTrainingName;
    this.member.plan=this.MemberPlan.value;
    this.member.amount=this.MemberAmount.value;
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    console.log(JSON.stringify(this.member))
    this.memberservice.createMember(this.member)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.member = new Member();  
  }  
  
  get MemberName(){  
    return this.validateForm.get('member_name');  
  }  
  
  get MemberAddress(){  
    return this.validateForm.get('member_address');  
  }  
  
  get MemberDob(){  
    return this.validateForm.get('member_dob');  
  }  

  get MemberContact(){  
    return this.validateForm.get('member_contact');  
  } 

  get MemberStart_Date(){  
    return this.validateForm.get('member_start_date');  
  } 

  get MemberEnd_Date(){  
    return this.validateForm.get('member_end_date');  
  } 

  get MemberTraining(){  
    return this.validateForm.get('member_training');  
  } 

  get MemberPlan(){  
    return this.validateForm.get('member_plan');  
  }
  
  get MemberAmount(){  
    return this.validateForm.get('member_amount');  
  }
  
  addMemberForm(){  
    this.submitted=false;  
    this.validateForm.reset();  
  }  
}
