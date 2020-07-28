import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AddMemberComponent } from './Components/Member/add-member/add-member.component';
import { ViewMemberComponent } from './Components/Member/view-member/view-member.component';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddRecieptComponent } from './Components/Reciept/add-reciept/add-reciept.component';
import { ViewRecieptComponent } from './Components/Reciept/view-reciept/view-reciept.component';

import { LoginComponent } from './Components/Login/login.component';
import { LogoutComponent } from './Components/Logout/logout.component';
import { AddAdminComponent } from './Components/Admin/add-admin/add-admin.component';
import { HomeComponent } from './Components/Home/home.component';
import{ NgImageSliderModule } from 'ng-image-slider';
import { AddTrainingComponent } from './Components/Training/add-training/add-training.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { AboutComponent } from './Components/About/about.component';
import { DietchartComponent } from './Components/diet-chart/dietchart.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AddMemberComponent,
    ViewMemberComponent,
    
    AddRecieptComponent,
    ViewRecieptComponent,
    LoginComponent,
    LogoutComponent,
    AddAdminComponent,
    HomeComponent,
    AddTrainingComponent,
    
    AboutComponent,
    DietchartComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
    NgImageSliderModule,
    NzCarouselModule,
    SlickCarouselModule,
    Ng2SearchPipeModule
   
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
