import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dietchart',
  templateUrl: './dietchart.component.html',
  styleUrls: ['./dietchart.component.css']
})
export class DietchartComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  selectedGender:any;

  age:number;
  height:number;
  weight:number;
  activity:any;
  weight_type:any;
  bmr:number;
  validateCalories: FormGroup;
  calories:number;
  constructor(private fbs: FormBuilder) { }
  showdiv1=false;
  showdiv2=false;
  showdiv3=false;
  showdiv4=false;
  showdiv5=false;
  showdiv6=false;
  showdiv7=false;
  showdiv8=false;
  showdiv9=false;
  showdiv10=false;
  showdiv11=false;
  showdiv12=false;
  showdiv13=false;
  showdiv14=false;
  showdiv15=false;
  showdiv16=false;
  showdiv17=false;
  showdiv18=false;
  showdiv19=false;
  showdiv20=false;
  showdiv21=false;
  calcount:number;
  ngOnInit(): void {
    
    this.validateCalories = this.fbs.group({
      member_gender: new FormControl('', [ Validators.required]),
      member_height: [null, [ Validators.required]],
      member_weight: [null, [ Validators.required]],
      member_age: [null, [ Validators.required]],
     member_activity:[null, [ Validators.required]]
});


  }
  showdiet()
{
  
  if(this.calcount>=1000 && this.calcount<=1200 && this.weight_type=='Weight Loss')
  {
    this.showdiv1=true;
  }
  else this.showdiv1=false;

  if(this.calcount>=1000 && this.calcount<=1200 && this.weight_type=='Weight Gain')
  {
    this.showdiv2=true;
  }
  else this.showdiv2=false;

  if(this.calcount>=1000 && this.calcount<=1200 && this.weight_type=='Maintain Weight')
  {
    this.showdiv3=true;
  }
  else this.showdiv3=false;
   
  if(this.calcount>1200 && this.calcount<=1400 && this.weight_type=='Weight Loss')
  {
    this.showdiv4=true;
  }
  else this.showdiv4=false;
   
  if(this.calcount>1200 && this.calcount<=1400 && this.weight_type=='Weight Gain')
  {
    this.showdiv5=true;
  }
  else this.showdiv5=false;
   
  if(this.calcount>1200 && this.calcount<=1400 && this.weight_type=='Maintain Weight')
  {
    this.showdiv6=true;
  }
  else this.showdiv6=false;

  if(this.calcount>1400 && this.calcount<=1600 && this.weight_type=='Weight Loss')
  {
    this.showdiv7=true;
  }
  else this.showdiv7=false;
   
  
  if(this.calcount>1400 && this.calcount<=1600 && this.weight_type=='Weight Gain')
  {
    this.showdiv8=true;
  }
  else this.showdiv8=false;
   
  
  if(this.calcount>1400 && this.calcount<=1600 && this.weight_type=='Maintain Weight')
  {
    this.showdiv9=true;
  }
  else this.showdiv9=false;
   
  if(this.calcount>1600 && this.calcount<=1800 && this.weight_type=='Weight Loss')
  {
    this.showdiv10=true;
  }
  else this.showdiv10=false;
   
  
  if(this.calcount>1600 && this.calcount<=1800 && this.weight_type=='Weight Gain')
  {
    this.showdiv11=true;
  }
  else this.showdiv11=false;
   
  
  if(this.calcount>1600 && this.calcount<=1800 && this.weight_type=='Maintain Weight')
  {
    this.showdiv12=true;
  }
  else this.showdiv12=false;
   
  if(this.calcount>1800 && this.calcount<=2100 && this.weight_type=='Weight Loss')
  {
    this.showdiv13=true;
  }
  else this.showdiv13=false;
   
  
  if(this.calcount>1800 && this.calcount<=2100 && this.weight_type=='Weight Gain')
  {
    this.showdiv14=true;
  }
  else this.showdiv14=false;
   
  
  if(this.calcount>1800 && this.calcount<=2100 && this.weight_type=='Maintain Weight')
  {
    this.showdiv15=true;
  }
  else this.showdiv15=false;

  if(this.calcount>2100 && this.calcount<=2500 && this.weight_type=='Weight Loss')
  {
    this.showdiv16=true;
  }
  else this.showdiv16=false;

  if(this.calcount>2100 && this.calcount<=2500 && this.weight_type=='Weight Gain')
  {
    this.showdiv17=true;
  }
  else this.showdiv17=false;

  if(this.calcount>2100 && this.calcount<=2500 && this.weight_type=='Maintain Weight')
  {
    this.showdiv18=true;
  }
  else this.showdiv18=false;

  if( this.calcount>2500 && this.weight_type=='Weight Loss')
  {
    this.showdiv19=true;
  }
  else this.showdiv19=false;

  if( this.calcount>2500 && this.weight_type=='Weight Gain')
  {
    this.showdiv20=true;
  }
  else this.showdiv20=false;

  if( this.calcount>2500 && this.weight_type=='Maintain Weight')
  {
    this.showdiv21=true;
  }
  else this.showdiv21=false;
}


  CalBMR(){
  if(this.selectedGender =='male'){
    this.bmr=(10*this.Weight.value) + (6.25*this.Height.value) - (5*this.Age.value) + 5;
    
    if(this.activity== 'sedentary')
    {
      this.calories=this.bmr*1.2;
      
    }
    else if(this.activity=='lightly active')
    {
      this.calories=this.bmr*1.375;
    }
    else if(this.activity=='moderately active')
    {
      this.calories=this.bmr*1.55;
    }
    else if(this.activity=='very active')
    {
      this.calories=this.bmr*1.725;
    }
    else if(this.activity=='super active')
    {
      this.calories=this.bmr*1.9;
    }

    
    
    console.log(JSON.stringify(this.bmr));
    console.log(this.calories);
  }
  else{
    this.bmr=(10*this.Weight.value) + (6.25*this.Height.value) - (5*this.Age.value) - 161;
    if(this.activity== 'sedentary')
    {
      this.calories=this.bmr*1.2;
    }
    else if(this.activity=='lightly active')
    {
      this.calories=this.bmr*1.375;
    }
    else if(this.activity=='moderately active')
    {
      this.calories=this.bmr*1.55;
    }
    else if(this.activity=='very active')
    {
      this.calories=this.bmr*1.725;
    }
    else if(this.activity=='super active')
    {
      this.calories=this.bmr*1.9;
    }

    console.log(this.bmr);
    console.log(this.calories);
  }
  this.calcount=this.calories;
    console.log("calcpount :"+this.calcount);
  this.validateCalories.reset();

  
}



get Gender(){  
  return this.validateCalories.get('member_gender');  
}
get Weight(){  
  return this.validateCalories.get('member_weight');  
}
get Height(){  
  return this.validateCalories.get('member_height');  
}
get Age(){  
  return this.validateCalories.get('member_age');  
}






  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

 
}
