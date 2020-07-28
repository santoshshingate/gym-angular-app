import { Component, OnInit } from '@angular/core';
import {TrainingService} from 'src/app/Services/Training/training.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Training } from 'src/app/Class/Training/training';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})

export class AddTrainingComponent implements OnInit {
  
  validateForm:FormGroup
  validateUpdate:FormGroup
  training:Training=new Training();
  submitted=false;
  traininglist:Training[];
  trainings:Observable<Training[]>; 
  trainlist:any;
  isupdated=false;
  deleteMessage=false;
  isVisible=false;


  constructor(private trainingservice : TrainingService,private fb: FormBuilder,private modalService: NzModalService) { }

  ngOnInit(): void {
    this.validateForm=this.fb.group({
        training_type:[null,[Validators.required]],
        monthly:[null,[Validators.required]],
        quarterly:[null,[Validators.required]],
        yearly:[null,[Validators.required]]
      })

      this.validateUpdate=this.fb.group({
        t_id:[null,[Validators.required]],
        train_type:[null,[Validators.required]],
        month:[null,[Validators.required]],
        quarter:[null,[Validators.required]],
        year:[null,[Validators.required]]
      })


      this.trainingservice.getTypeList().subscribe(
        data=>{
          this.trainings=data;
          console.log(data);
        }
      )
  }
  showModal(): void {
    this.isVisible = true;
  }

 

  success(): void {
    const modal = this.modalService.success({
      //nzTitle: 'This is a notification message',
      nzContent: 'Training added successfully!!!!'
    });

    setTimeout(() => modal.destroy(), 3000);
  }

  saveTraining(saveTraining)
  {
    this.training=new Training();
    this.training.training_type=this.Train_Type.value;
    this.training.Monthly=this.Monthly.value;
    this.training.Quarterly=this.Quarterly.value;
    this.training.Yearly=this.Yearly.value;
    this.submitted=true;
    this.save();
    window.location.reload();
  }

  //delete training
  deleteTraining(training_id: number) {  
    this.trainingservice.deleteTraining(training_id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.trainingservice.getTypeList().subscribe(data =>{  
            this.trainings =data  
            })  
        },  
        error => console.log(error)); 
        window.location.reload();
  } 

  //confirmation 

  showDeleteConfirm(training_id): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure ?',
      nzContent: '<b style="color: red;">Once deleted cannot be recovered</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteTraining(training_id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  updateTraining(training_id: number){  
  
    this.trainingservice.getTraining(training_id)  
      .subscribe(  
        data => {  
          console.log(data);
          this.trainlist=Array.of(data)          
        },  
        error => console.log(error));  
  }

  updateTrain(updtrain){  
    this.training=new Training(); 
    this.training.training_id= this.T_id.value;   
    this.training.training_type=this.T_Type.value;  
    this.training.Monthly=this.Monthly_data.value;  
    this.training.Quarterly=this.Quarterly_data.value;
    this.training.Yearly=this.Yearly_data.value;
    
  
    console.log(this.T_Type.value);  
     
  
   this.trainingservice.updatetraining(this.training.training_id,this.training).subscribe(  
    data => {       
      this.isupdated=true;  
      this.trainingservice.getTypeList().subscribe(data =>{  
        this.traininglist =data  
        console.log("data check "+ data)
        })  
    },  
    error => console.log(error));  
    
  }

  save()
  {
    console.log("test me "+JSON.stringify(this.training))
    this.trainingservice.createTraining(this.training).subscribe(data=>console.log(data),error=>console.error());
    this.training=new Training();
  }

  get Train_Type()
  {
    return this.validateForm.get('training_type');
  }
  
  get Monthly()
  {
    return this.validateForm.get('monthly');
  }
  get Quarterly()
  {
    return this.validateForm.get('quarterly');
  }
  get Yearly()
  {
    return this.validateForm.get('yearly');
  }

  
  get T_id()
  {
    return this.validateUpdate.get('t_id');
  }
  get T_Type()
  {
    return this.validateUpdate.get('train_type');
  }
  
  get Monthly_data()
  {
    return this.validateUpdate.get('month');
  }
  get Quarterly_data()
  {
    return this.validateUpdate.get('quarter');
  }
  get Yearly_data()
  {
    return this.validateUpdate.get('year');
  }
  addMemberForm(){  
    this.submitted=false;  
    this.validateForm.reset();  
  }  

  handleCancel(): void {
    this.isVisible = false;
  }

  changeisUpdate(){  
    this.isupdated=false;  
    window.location.reload();
  } 
}
