import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrl: './add-program.component.css'
})
export class AddProgramComponent {
  @Output() programAdded = new EventEmitter<any>();
  @Output() cancelAdd = new EventEmitter<void>();

  // Program model aligned with the C# entity
  program = {
    name: '',
    description: '',
    programstatus: true, // Default to active
    createdDate: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD
  };

  onSubmit() {
    if (
      this.program.name &&
      this.program.description &&
      this.program.createdDate
    ) {
      this.programAdded.emit(this.program);
    }
  }

  cancel() {
    this.cancelAdd.emit();
  }
}
