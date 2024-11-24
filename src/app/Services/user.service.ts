import { Injectable } from '@angular/core';
import { Token } from '../Modals/token';
import { HttpClient } from '@angular/common/http';
import { User } from '../Modals/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:5204/api/User/Login";
  
  constructor(private http : HttpClient) { }

  registerUser(user : any){
    return this.http.post<Token>("http://localhost:5204/api/User/Register" , user);
  }

  logIn(user : any){
    return this.http.post<Token>( this.url, user);
  }
  getRoles(){
    return this.http.get(this.url);
  }
  // getAllUsers(){
  //   return this.http.get<User[]>("http://localhost:5057/api/Users?role=2")
  // }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
      }
      return true;
    }
    return false;
  }
}

