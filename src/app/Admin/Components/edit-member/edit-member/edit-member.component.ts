import { Component, Input } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../Modals/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.css'
})
export class EditMemberComponent {
  @Input() member!: User;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {}

  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }

  onSubmit() {
    this.userService.updateUser(this.member).subscribe(
      () => {
        this.toastr.success('Member updated successfully!', 'Success');
        this.activeModal.close(this.member); // Pass updated member back
      },
      (error) => {
        this.toastr.error(
          'An error occurred while updating the member.',
          'Error'
        );
        console.error(error); // Log error for debugging
      }
    );
  }
}
