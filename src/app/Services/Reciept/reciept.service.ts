import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class RecieptService {

  private baseUrl='http://localhost:8080/gym/feedetails/';
  private saveUrl='http://localhost:8080/gym/savereciept/';
  private recurl='http://localhost:8080/gym/reciept/';
  private upurl='http://localhost:8080/gym/update-reciept/';
  
  constructor(private http:HttpClient) { }

  getRecieptList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`);  
  }

  createReciept(reciept: object): Observable<object> {  
    return this.http.post(`${this.saveUrl}`, reciept);  
  } 

  getReciept(rec_id: number): Observable<Object> {  
    return this.http.get(`${this.recurl}${rec_id}`);  
  }

  updateReciept(rec_id: number, value: any): Observable<Object> {  
    return this.http.put(`${this.upurl}${rec_id}`, value);  
  }  

}
