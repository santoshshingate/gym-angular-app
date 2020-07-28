import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMemberComponent } from 'src/app/Components/Member/add-member/add-member.component';
import { ViewMemberComponent } from 'src/app/Components/Member/view-member/view-member.component';
import { AddRecieptComponent } from 'src/app/Components/Reciept/add-reciept/add-reciept.component';
import { ViewRecieptComponent } from 'src/app/Components/Reciept/view-reciept/view-reciept.component';

import {LoginComponent} from './Components/Login/login.component';
import { LogoutComponent } from './Components/Logout/logout.component';
import { AuthguardService } from './Services/Auth-Guard/authguard.service';
import { AddAdminComponent } from './Components/Admin/add-admin/add-admin.component';
import { HomeComponent } from './Components/Home/home.component';
import { AddTrainingComponent } from './Components/Training/add-training/add-training.component';

import { AboutComponent } from './Components/About/about.component';
import { DietchartComponent } from './Components/diet-chart/dietchart.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'view-member', component: ViewMemberComponent,canActivate:[AuthguardService] },  
  { path: 'add-member', component: AddMemberComponent ,canActivate:[AuthguardService]},
  { path: 'add-reciept', component: AddRecieptComponent ,canActivate:[AuthguardService]},
  { path: 'view-reciept', component: ViewRecieptComponent ,canActivate:[AuthguardService]},
 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthguardService] },
  { path: 'add-training', component: AddTrainingComponent,canActivate:[AuthguardService] },
  { path: 'add-admin', component: AddAdminComponent,canActivate:[AuthguardService] },
  { path: 'about-us', component: AboutComponent },
  { path: 'diet-chart', component: DietchartComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
