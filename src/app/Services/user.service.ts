import { Injectable } from '@angular/core';
import { Token } from '../Modals/token';
import { HttpClient } from '@angular/common/http';
import { User } from '../Modals/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:5204/api/User";
  
  constructor(private http : HttpClient) { }

  registerUser(user : any){
    return this.http.post<Token>("http://localhost:5204/api/User/Register" , user);
  }

  logIn(user : any){
    return this.http.post<Token>( "http://localhost:5204/api/User/Login", user);
  }
  getRoles(){
    return this.http.get(this.url);
  }
  loadUsers(){
    return this.http.get<User[]>(`${this.url}/GetUsers?role=0`)
  }

  deleteUser(id: number) {
    return this.http.delete("http://localhost:5204/api/User/DeleteUser" + "/" + id);
  }

  getUser(id: number) {
    return this.http.get<User>( "http://localhost:5204/api/User/GetUserByID" + "/" + id);
  }

  updateUser(user: User, id : number) {
    return this.http.put( "http://localhost:5204/api/User/UpdateUser" + "?id=" + id, user);
  }

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

