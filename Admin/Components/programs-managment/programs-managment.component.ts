import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from "../../../Pipes/search-filter.pipe";
import { ProgramService } from '../../../Services/program.service';
import { Program } from '../../../Modals/program';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-programs-managment',
  templateUrl: './programs-managment.component.html',
  styleUrl: './programs-managment.component.css',
})
export class ProgramsManagementComponent implements OnInit {

  searchText = '';
  isAddingProgram = false;
  programs! : Program[];  // Changed to hold dynamic data

  constructor(private programsService: ProgramService , private toastrService : ToastrService) {}  // Inject the service

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

  loadPrograms(){
    this.programsService.getPrograms().subscribe(data =>{
      this.programs = data;
     } )
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
    console.log(`Edit program with ID: ${id}`);
  }
  deleteProgram(arg0: number) {
    throw new Error('Method not implemented.');
    }
  
}
