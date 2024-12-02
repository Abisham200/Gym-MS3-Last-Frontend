import { Component, Input } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../Modals/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

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
    public activeModal: NgbActiveModal,
    private route : ActivatedRoute
  ) {

    // const Uid = this.route.snapshot.paramMap.get('id');
    // this.member.id = Number(Uid);
  }

  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }

  onSubmit() {
    this.userService.updateUser(this.member,this.member.id).subscribe(
      data => {
        console.log(data);
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
