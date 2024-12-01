import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../Modals/program';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
    private baseUrl = 'http://localhost:5204/api/GymProgram'; // Base API URL
  
    constructor(private http: HttpClient) {}
  
    // Fetch programs
    getPrograms(): Observable<Program[]> {
      return this.http.get<Program[]>(`${this.baseUrl}/GetPrograms`);
    }
  
    // Add a new program
    addProgram(program: Omit<Program, 'id'>): Observable<Program> {
      return this.http.post<Program>(this.baseUrl, program);
    }
}
