import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from "../../../Pipes/search-filter.pipe";
import { ProgramService } from '../../../Services/program.service';
import { Program } from '../../../Modals/program';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs-managment',
  templateUrl: './programs-managment.component.html',
  styleUrl: './programs-managment.component.css',
})
export class ProgramsManagementComponent implements OnInit {
  searchText = '';
  isAddingProgram = false;
  programs! : Program[]; 
  program! : Program;

  constructor(private programsService: ProgramService, private toastr : ToastrService, private router : Router) {} 

  ngOnInit(): void {
    this.fetchPrograms();
  }

  // Fetch programs data from the service
  fetchPrograms(): void {
    this.programsService.getPrograms().subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  loadPrograms(): void {
    this.programsService.getPrograms().subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => {
        console.error('Error loading programs:', error);
      }
    );
  }

  // showAddProgramForm() {
  //   this.isAddingProgram = true;
  // }

  addProgram(newProgram: any) {
    const nextId = this.programs.length ? Math.max(...this.programs.map((p) => p.id)) + 1 : 1;
    this.programs.push({ ...newProgram, id: nextId });
    this.isAddingProgram = false;
  }

  cancelAddProgram() {
    this.isAddingProgram = false;
  }

  editProgram(id: number) {
    this.router.navigate(['/admin/programManagement/programEdit', id]);
    this.programsService.getProgramById(id).subscribe(data =>{
      this.program = data;
    })
    
  }

  onDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this User?');
  
    if (confirmation) {
      // Proceed with the deletion if confirmed
      this.programsService.deleteProgram(id).subscribe(
        data => {
          console.log(data);
          this.toastr.success('User deleted successfully');
          this.loadPrograms(); // Refresh the enrollment list
        },
        error => {
          console.error(error);
          this.toastr.error('Error deleting User');
        }
      );
    } else {
      this.toastr.info('Deletion cancelled');
    }
  }
}
