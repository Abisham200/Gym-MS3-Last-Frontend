import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enrollment } from '../Modals/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiurl = 'http://localhost:5204/api/Enrollment';

  constructor(private http : HttpClient) { }

  
  addEnrollment(obj : any){
   return this.http.post(`${this.apiurl}/AddEnroll` , obj);
  }

  // Fetch all enrollments
  getEnrollments() {
    return this.http.get<enrollment[]>("http://localhost:5204/api/Enrollment/GetAllEnrolls")
  }
  
    // Delete an enrollment
    deleteEnrollment(Id: number) {
      return this.http.delete(this.apiurl + "/DeleteEnroll/" + Id); // Adjust endpoint if needed
    }
  
    // Fetch a single enrollment by member (if needed)
    getEnrollmentByMember(memberId: number): Observable<enrollment> {
      return this.http.get<enrollment>(
        `${this.apiurl}/GetAllEnrollByMember/${memberId}`
      );
    }
}
