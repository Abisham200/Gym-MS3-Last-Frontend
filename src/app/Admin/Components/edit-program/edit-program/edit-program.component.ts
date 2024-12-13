import { Component, OnInit } from '@angular/core';
import { Program } from '../../../../Modals/program';
import { ProgramService } from '../../../../Services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrl: './edit-program.component.css'
})
export class EditProgramComponent implements OnInit {

  program: Program = {
    id: 0,
    name: '',
    pricePerMonth: 0,
    description: '',
    programStatus: true,
    createdDate: new Date()
  };
  programId: number = 0;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    // Retrieve program ID from URL
    this.programId = +this.route.snapshot.paramMap.get('id')!;
    this.getProgramDetails();
  }

  getProgramDetails(): void {
    this.programService.getProgramById(this.programId).subscribe(
      (data: Program) => {
        this.program = data; 
      },
      (error) => {
        console.error('Error fetching program details:', error);
        this.toastr.error('Failed to load program details. Please try again.', 'Error'); 
      }
    );
  }

  onSubmit(): void {
    // Call editProgram method from the service to update the program
    this.programService.editProgram(this.program, this.programId).subscribe(
      (updatedProgram) => {
        console.log('Program updated successfully:', updatedProgram);
        this.toastr.success('Program updated successfully!', 'Success');
        this.router.navigate(['/programManagement'], { queryParams: { reload: true } }); 
      },
      (error) => {
        console.error('Error updating program:', error);
        this.toastr.error('There was an error updating the program. Please try again.', 'Error'); 
      }
    );
  }

  closeModal(): void {
    this.router.navigate(['/programManagement']);
  }


}

