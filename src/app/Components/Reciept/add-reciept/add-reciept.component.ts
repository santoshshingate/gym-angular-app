import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MemberService} from 'src/app/Services/Member/member.service'
import { Member } from 'src/app/Class/Member/member';
import { Reciept } from 'src/app/Class/Reciept/reciept';
import { RecieptService } from 'src/app/Services/Reciept/reciept.service';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-add-reciept',
  templateUrl: './add-reciept.component.html',
  styleUrls: ['./add-reciept.component.css']
})
export class AddRecieptComponent implements OnInit {

  validateForm2: FormGroup;
  
  members: Member[];
  member:Member=new Member();
  selectedName:Observable<Member[]>;
  PaidAmount:number;
  selectedmemName:String;
  ActualAmount:number;
  selectedTraining:String;
  BalAmount:any;
  amount:number;
  DiscountPercent:any;
  TotalAmount:number;
  PlanType:String;
  memid:number;
  recid:number;
  recname:String;
  dueamt:number;
  currentDate:Date=new Date();
  reclist:any;
  reciepts:Observable<Reciept[]>; 
  reciept:Reciept=new Reciept(); 
  submitted=false;
  isupdated=false;
  pdfTable: any;
  printdiv: any;
  showsave=false;
  showupdate=false;
  date:Date=new Date();
  

  @ViewChild('MyDiv', { 'static': true }) content:ElementRef;

  submitForm(): void {
    console.log("test me"+this.validateForm2.value);
  }
  
 

  constructor(private fb: FormBuilder,private memberservice:MemberService,private recieptservice:RecieptService,private modalService: NzModalService) { 
     
  }

  ngOnInit(): void {
    this.validateForm2=this.fb.group({
      member_names:[null, [Validators.required]],
      member_id:[null, [Validators.required]],
      reciept_date:[null, [Validators.required]],
      member_training:[null, [Validators.required]],
      actual_amount:[null, [Validators.required]],
      paid_amount:[null, [Validators.required]],
      balance_amount:[null, [Validators.required]],
      total_amount:[null, [Validators.required]],
      plan_type:[null, [Validators.required]],
      reciept_id:[null],
    })

   
    console.log("inside oninit");
    this.memberservice.getMemberList().subscribe(data =>{  
      this.members =data;
      console.log(data);
    }) 

    console.log("inside recieptdetails");
    this.recieptservice.getRecieptList().subscribe(data=>
      {
        this.reciepts=data;
        console.log(data);
      })
  }


  // print pdf
//   makePdf(){
//   const options={
//     filename: 'print.pdf',
//     image: {type: 'jpeg'},
    
//     html2canvas: {},
//     jsPDF: {Orientation:'landscape'}
//   };

//   const content : Element=document.getElementById('MyDIv');

//   html2pdf()
//   .from(content).set(options).save();
// }

// IfExists()
// {
// if(this.reciept.rec_id == this.recid)
// {
//   console.log("inside if")
//   this.showupdate=false;
//   this.showsave=true;
// }

// else {
//   console.log("inside else")
//   this.showsave=false;
//  this.showupdate=true;
// }
// }

printComponent(MyDIv) {
  let printContents = document.getElementById(MyDIv).innerHTML;
  let originalContents = document.body.innerHTML;

  // window.document.write(`<html><head><link rel="stylesheet" 
  // type="text/css" href="test.component.css" /></head><body>`)
  document.body.innerHTML = printContents;

  window.print();
  
  document.body.innerHTML = originalContents;
  window.location.reload();

}

  // const div = document.getElementById('MyDiv');
  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   };

  //   html2canvas(div, options).then((canvas) => {

  //     var img = canvas.toDataURL("image/PNG");
  //     var doc = new jsPDF('l', 'mm', 'a4', 1);

  //     // Add image Canvas to PDF
  //     const bufferX = 5;
  //     const bufferY = 5;
  //     const imgProps = (<any>doc).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

  //     return doc;
  //   }).then((doc) => {
  //     doc.save('postres.pdf');  
  //   });
  // }
  
  

  // exportAsPDF()
  // {
  //   let data = document.getElementById('MyDIv');  
  //   html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //     // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
  //     pdf.save('Receipt.pdf');   
  //   }); 
  // }
  


  UpdateAmount(selectedName)
  {
    
    console.log(`selected name ::: ${JSON.stringify(selectedName)}`);
    
    if(selectedName){
      // this.ActualAmount = this.members[0].amount;
      this.ActualAmount=selectedName.AMOUNT;
      this.selectedTraining=selectedName.TRAINING;
      this.PlanType=selectedName.PLAN;
      this.memid=selectedName.MEM_ID;
      this.BalAmount=selectedName.BALANCE_AMOUNT;
      this.recid=selectedName.REC_ID;
      this.recname=selectedName.NAME;
      
      console.log(this.ActualAmount)
      if(this.reciept.rec_id == this.recid)
{
  console.log("inside if")
  this.showupdate=false;
  this.showsave=true;
}

else {
  console.log("inside else")
  this.showsave=false;
 this.showupdate=true;
}
      
  }
  else{this.ActualAmount =0;}

}

// updateBalance()
// {
//    console.log("inside update"+this.BalAmount);

//   if(this.BalAmount>0){
//     this.BalAmount = this.BalAmount - this.PaidAmount;
//     this.TotalAmount= this.PaidAmount;
//   }
//   else{
//     console.log(`balance amount is zero`);
//     this.BalAmount = this.ActualAmount - this.PaidAmount;
//     this.TotalAmount= this.PaidAmount;
//   }
// }

updateBalance(PaidAmount)
{
  if(this.BalAmount>0){
         this.BalAmount = this.BalAmount - this.PaidAmount;
        this.TotalAmount= this.PaidAmount;
        
  }
  else{
    this.BalAmount = this.ActualAmount - this.PaidAmount;
        this.TotalAmount= this.PaidAmount;
  }
}

//code for updating ..getting by id

UpdateReciept(rec_id: number){  
  
  this.recieptservice.getReciept(rec_id) 
    .subscribe(  
      data => {  
        console.log(data);
        this.reclist=Array.of(data)           
      },  
      error => console.log(error));  
}

updRec()
{
  this.reciept=new Reciept();
  this.reciept.rec_id=this.Reciept_ID.value;
  this.reciept.rec_training=this.selectedTraining
  this.reciept.rec_plan=this.PlanType;
   this.reciept.rec_actualamount=this.ActualAmount;
 
  this.reciept.paid_amount=this.Paid_Amount.value;
  this.reciept.paid_date=this.Paid_Date.value;
  this.reciept.balance_amount=this.Balance_Amount.value;
  this.reciept.total=this.Total_Amount.value;
  console.log(this.Paid_Amount.value);  


  this.recieptservice.updateReciept(this.reciept.rec_id,this.reciept).subscribe(  
    data => {       
      this.isupdated=true;  
      this.recieptservice.getRecieptList().subscribe(data =>{  
        this.reciepts= data  
        })  
    },  
    error => console.log(error));
    this.updatesuccess();
}

updatesuccess(): void {
  const modal = this.modalService.success({
  
    nzContent: 'Receipt updated Successfully!!'
  });

  setTimeout(() => modal.destroy(), 2000);
}
// UpdateNew(BalAmount)
// {
//   if(BalAmount)
//   {
//     this.BalAmount = this.ActualAmount - this.PaidAmount;
//     // this.BalAmount=this.BalAmount - this.PaidAmount;
//   }
// }

// updateBalance()
// {
  
  
//   if(this.BalAmount==0)
//   {

//     console.log("inside if");
//     this.dueamt = this.ActualAmount - this.PaidAmount;
//     this.BalAmount=this.dueamt;
//     //this.BalAmount=this.dueamt;
//   }
//   else if(this.BalAmount!=0) {
//     console.log("inside else");
   
//     this.dueamt=this.BalAmount - this.PaidAmount;
//     this.TotalAmount=this.dueamt;
      
//   }
// }

saveReciept(saveReciept)
{
this.reciept=new Reciept();
this.reciept.mem_id=this.Member_ID.value;
this.reciept.rec_name=this.recname;
 this.reciept.rec_training=this.selectedTraining
 this.reciept.rec_plan=this.PlanType;
  this.reciept.rec_actualamount=this.ActualAmount;
this.reciept.paid_amount=this.Paid_Amount.value;
this.reciept.paid_date=this.Paid_Date.value;
this.reciept.balance_amount=this.Balance_Amount.value;
this.reciept.total=this.Total_Amount.value;
this.submitted = true;  
this.save();
}

save() {  
  console.log("test me 2"+JSON.stringify(this.reciept))
  this.recieptservice.createReciept(this.reciept)  
    .subscribe(data => console.log(data), error => console.log(error));  
  this.reciept = new Reciept(); 
  this.savesuccess(); 
}

savesuccess(): void {
  const modal = this.modalService.success({
    
    nzContent: 'Receipt Saved Successfully!!'
  });

  setTimeout(() => modal.destroy(), 2000);
}

get Member_ID()
{
  return this.validateForm2.get('member_id');
}

get Member_Name()
{
  return this.validateForm2.get('member_names');
}

get Reciept_ID()
{
  return this.validateForm2.get('reciept_id');
}

get Paid_Amount()
{
  return this.validateForm2.get('paid_amount');
}

get Balance_Amount()
{
  return this.validateForm2.get('balance_amount');
}

get Paid_Date()
{
  return this.validateForm2.get('reciept_date');
}

get Total_Amount()
{
  return this.validateForm2.get('total_amount');
}


AddRecieptForm(){  
  this.submitted=false;  
  this.validateForm2.reset();  
}  
}


