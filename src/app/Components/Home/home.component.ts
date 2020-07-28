import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  bmi:any;
  height:any;
  weight:any;
  condition:any;
  show=false

  images = [  
    { img: "../assets/img/gym1.jpg" },
    { img: "../assets/img/gym.jpg" }, 
    { img: "../assets/img/gym2.jpg" },
    { img: "../assets/img/gym3.jpg" },  
    { img: "../assets/img/gym4.jpg" },
    { img: "../assets/img/gym5.jpg" },  
    { img: "../assets/img/gym6.jpg" },
    { img: "../assets/img/gym7.jpg" },
    { img: "../assets/img/gym8.jpg" }
        
     
  ];  

  pics = [  
    { img: "../assets/img/gym1.jpg" },
    { img: "../assets/img/gym.jpg" }
   
        
     
  ];  
  
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true, 
    "autoplay": true,
    "autoplayspeed": 1000,
    "arrows": true,
    "adaptiveHeight":true,
    "infinite": false 

  }; 
//   imageObject: Array<object> = [{

//     image: 'assets/img/gym1.png',

//     thumbImage: 'assets/img/gym1.png',
//     alt: 'alt of image',
    
// }, {

//     image1: 'assets/img/gym2.jpg', // Support base64 image

//     thumbImage: 'assets/img/gym2.jpg', // Support base64 image
//      //Optional: You can use this key if want to show image with title
//     alt: 'Image alt' //Optional: You can use this key if want to show image with alt
// }
// ];

   constructor() { }


  ngOnInit(): void {

    
  }

  determinateBmi() {
     this.bmi =  this.weight / (this.height * 2);
  
    console.log(`value of bmi ........${JSON.stringify (this.determinateBmi)}`);
  
  }
  determinateBmiLevel() {
    this.determinateBmi();
    if (this.bmi <= 18) {
      this.condition = 'Under weight!';
    } else if (18 < this.bmi && this.bmi <= 25) {
      this.condition = 'Normal weight';
    } else if (25 < this.bmi && this.bmi <= 30) {
      this.condition = 'Overweight';
    } else if (30 < this.bmi && this.bmi <= 35) {
      this.condition = 'Obesity level 1';
    } else if (35 < this.bmi && this.bmi <= 40) {
      this.condition = 'Obesity level 2';
    } else if (this.bmi > 40) {
      this.condition = 'Obesity level 3';
    } else {
      this.condition = 'Try another values';
    }
    
    this.show=true
  }
  
}
