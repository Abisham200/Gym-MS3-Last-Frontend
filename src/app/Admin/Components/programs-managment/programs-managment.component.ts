import { Component } from '@angular/core';

@Component({
  selector: 'app-programs-managment',
  templateUrl: './programs-managment.component.html',
  styleUrl: './programs-managment.component.css'
})
export class ProgramsManagementComponent {
  searchText = '';
  isAddingProgram = false;
  programs = [
    {
      id: 1,
      name: 'Yoga Basics',
      duration: '4 Weeks',
      level: 'Beginner',
      description: 'A foundational yoga program designed for beginners.',
    },
    {
      id: 2,
      name: 'Strength Training',
      duration: '8 Weeks',
      level: 'Intermediate',
      description: 'A focused strength-building program for intermediate fitness levels.',
    },
    {
      id: 3,
      name: 'HIIT Blast',
      duration: '6 Weeks',
      level: 'Advanced',
      description: 'High-intensity interval training for experienced individuals.',
    },
  ];




  showAddProgramForm() {
    this.isAddingProgram = true;
  }

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

  deleteProgram(id: number) {
    this.programs = this.programs.filter((program) => program.id !== id);
  }
}
