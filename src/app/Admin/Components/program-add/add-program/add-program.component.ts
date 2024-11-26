import { Component, EventEmitter, Output } from '@angular/core';
import { ProgramService } from '../../../../Services/program.service';
import { Program } from '../../../../Modals/program';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrl: './add-program.component.css'
})
export class AddProgramComponent {
  @Output() programAdded = new EventEmitter<any>();
  @Output() cancelAdd = new EventEmitter<void>();

  // Program model aligned with the C# entity
  program: Program = {
    name: '',
    description: '',
    programstatus: true, // Default to active
    createdDate: new Date().toISOString().split('T')[0], // Default to today's date
    pricepermonth: 0,
  };

  constructor(private programService: ProgramService) {}

  onSubmit() {
    if (this.program.name && this.program.description && this.program.createdDate && this.program.pricepermonth > 0) {
      console.log('Submitting program:', this.program); // Debug log
      this.programService.addProgram(this.program).subscribe(
        (response) => {
          console.log('Program added successfully:', response);
          this.programAdded.emit(response);
        },
        (error) => {
          console.error('Error adding program:', error.message, error.status, error.error);
        }
      );
    } else {
      console.warn('Form is invalid or missing fields:', this.program);
    }
  }

  cancel() {
    this.cancelAdd.emit();
  }
}
