import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseUrl='http://localhost:8080/gym/types/';
  private saveUrl='http://localhost:8080/gym/saveTraining/';
  private delurl='http://localhost:8080/gym/training-del/';
  private upurl='http://localhost:8080/gym/update-training/';
  private geturl='http://localhost:8080/gym/training/';

  constructor(private http:HttpClient) { 
  }

  createTraining(training:object): Observable<object>
  {
    return this.http.post(`${this.saveUrl}`,training);
  }

  getTypeList(): Observable<any>{
  return this.http.get(`${this.baseUrl}`);
  }

  // updatetraining(training_id:number,value:any):Observable<Object>{
  //   return this.http.put(`${this.upurl}`,value);
  // }

  updatetraining(training_id: number, value: any): Observable<Object> {  
    return this.http.put(`${this.upurl}${training_id}`, value);  
  } 

  getTraining(training_id:number):Observable<Object>{
    return this.http.get(`${this.geturl}${training_id}`);
  }

  deleteTraining(training_id:number):Observable<Object>{
    return this.http.delete(`${this.delurl}${training_id}`);
  }




}
