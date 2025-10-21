import { Component, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { single } from 'rxjs';
import { Member } from '../../_models/member';
import { Account } from '../../_services/account';
import { Members } from '../../_services/members';
import { TabsetComponent, TabsModule } from "ngx-bootstrap/tabs";
import { FormsModule, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditor } from "../photo-editor/photo-editor";

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule, PhotoEditor],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css'
})
export class MemberEdit implements OnInit {
  @ViewChild('editForm') editForm?: NgModel;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  private accountService = inject(Account);
  private memberService = inject(Members);
  private toastr = inject(ToastrService);
  member = signal<Member | null>(null);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.userName).subscribe({
      next: member => this.member.set(member as Member)
    });
  }


  // updateMember() {
  //   this.memberService.updateMember(this.editForm?.value).subscribe({
  //     next: _ => {
  //       this.toastr.success('Profile updated successfully');
  //       this.editForm?.reset(this.member());
  //     } 
  //   })
  // }

  updateMember() {
    const updatedData = this.editForm?.value;

    this.memberService.updateMember(updatedData).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');

        // ✅ Merge updated values into the signal
        this.member.update(current => current ? { ...current, ...updatedData } as Member : current);

        // ✅ Reset form with updated data
        this.editForm?.reset(this.member());
      }
    });
  }

  onMemberChange(event: Member) {
    this.member.set(event);
  }

}
