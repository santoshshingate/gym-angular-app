import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl='http://localhost:8080/gym/members/';

  private memberlisturl='http://localhost:8080/gym/members-list/';

  private geturl='http://localhost:8080/gym/member/';

  private saveurl='http://localhost:8080/gym/savemember/';

  private delurl="http://localhost:8080/gym/member-del/";

  private upurl="http://localhost:8080/gym/member-up/"

  private counturl="http://localhost:8080/gym/count/";

  constructor(private http:HttpClient) { }
  getMemberList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`);  
  } 
  
  getMembers(): Observable<any> {  
    return this.http.get(`${this.memberlisturl}`);  
  } 

  getCount(): Observable<any> {  
    return this.http.get(`${this.counturl}`);  
  }  
  
  createMember(member: object): Observable<object> {  
    return this.http.post(`${this.saveurl}`, member);  
  }  
  
  deleteMember(mem_id: number): Observable<any> {  
    return this.http.delete(`${this.delurl}${mem_id}`, { responseType: 'text' });  
  } 
  
  // updateMember(mem_id: number): Observable<any> {  
  //   return this.http.put(`${this.upurl}${mem_id}`, { responseType: 'text' });  
  // } 
  
  getMember(mem_id: number): Observable<Object> {  
    return this.http.get(`${this.geturl}${mem_id}`);  
  }  
  
  updateMember(mem_id: number, value: any): Observable<Object> {  
    return this.http.put(`${this.upurl}${mem_id}`, value);  
  }    

}  
