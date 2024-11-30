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
  getEnrollments(): Observable<enrollment[]> {
    return this.http.get<enrollment[]>(`${this.apiurl}/GetAllEnrolls`);
  }
  
    // Delete an enrollment
    deleteEnrollment(enrollmentId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiurl}/DeleteEnroll/${enrollmentId}`); // Adjust endpoint if needed
    }
  
    // Fetch a single enrollment by member (if needed)
    getEnrollmentByMember(memberId: number): Observable<enrollment> {
      return this.http.get<enrollment>(
        `${this.apiurl}/GetAllEnrollByMember/${memberId}`
      );
    }
}
