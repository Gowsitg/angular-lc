import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }
   url = 'localhost/angular-lc'
  login(user: any) {
    return  this.http.post<any>(`${this.url}/api/login`, user)
     
  } 
}
