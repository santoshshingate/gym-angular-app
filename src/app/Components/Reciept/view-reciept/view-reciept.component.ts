import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecieptService } from 'src/app/Services/Reciept/reciept.service';
import { Reciept } from 'src/app/Class/Reciept/reciept';
import { Observable} from "rxjs";  
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-reciept',
  templateUrl: './view-reciept.component.html',
  styleUrls: ['./view-reciept.component.css']
})
export class ViewRecieptComponent implements OnInit {

  feedetails:Observable<Reciept[]>;
  recdetails:any;
  date:Date=new Date();
  isVisible=false;
  isupdated = false;


  constructor(private recieptservice:RecieptService) { }
   reciept:Reciept=new Reciept();
  ngOnInit(): void {
    console.log("inside oninit");
     
    
    this.recieptservice.getRecieptList().subscribe(data=>{
      this.feedetails=data;
      console.log(data);
      console.log(JSON.stringify(this.feedetails));
      }
      )

      
  }
  

  printComponent(recDiv) {

    
    let printContents = document.getElementById(recDiv).innerHTML;
    let originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
  
    window.print();
    
    document.body.innerHTML = originalContents;
    window.location.reload();
  
  }

  GetReciept(rec_id: number){ 
    this.isVisible=true;
    this.recieptservice.getReciept(rec_id).subscribe(data=>{
      
      console.log(data);
      this.recdetails=Array.of(data)
      console.log(JSON.stringify(this.recdetails));
        },  
        error => console.log(error));        
          
  }

    recieptform=new FormGroup({  
  
    rec_id:new FormControl(),  
    rec_name:new FormControl(),
    rec_training:new FormControl(),
    rec_plan:new FormControl(),
    mem_id:new FormControl(),  
    paid_amount:new FormControl(),  
    paid_date:new FormControl(),
    balance_amount:new FormControl(),  
    total:new FormControl()
  
  }); 

  get RecId()
  {
    return this.recieptform.get('rec_id');
  }
  get MemberId(){  
    return this.recieptform.get('mem_id');  
  } 
  get PaidAmt()
  {
    return this.recieptform.get('paid_amount');
  }
  get PaidDate()
  {
    return this.recieptform.get('paid_date');
  }
  get BalAmt()
  {
    return this.recieptform.get('balance_amount');
  }
  get Total()
  {
    return this.recieptform.get('total');
  } 
  
  handleCancel(): void {
    this.isVisible = false;
  } 
}
