import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private baseUrl='http://localhost:8080/gym/logindetails/';
  private saveurl='http://localhost:8080/gym/savelogin/';
  private geturl='http://localhost:8080/gym/admin/';
  private upurl='http://localhost:8080/gym/update-admin/';
  private delurl='http://localhost:8080/gym/admin-del/';

  getLoginDetails(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  createAdmin(login: object): Observable<object> {  
    return this.http.post(`${this.saveurl}`, login);  
  } 

  getAdmin(logid: number): Observable<Object> {  
    return this.http.get(`${this.geturl}${logid}`);  
  }

  updateAdmin(logid: number, value: any): Observable<Object> {  
    return this.http.put(`${this.upurl}${logid}`, value);  
  }
  
  deleteAdmin(logid:number):Observable<Object>{
    return this.http.delete(`${this.delurl}${logid}`);
  }

}