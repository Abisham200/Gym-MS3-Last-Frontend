import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http : HttpClient) { }
  addEnrollment(obj : any){
   return this.http.post("http://localhost:5204/api/Enrollment/AddEnroll" , obj);
  }

}
