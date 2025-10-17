import { Component, inject, OnInit, signal } from '@angular/core';
import { Members } from '../../_services/members';
import { Member } from '../../_models/member';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  private memberService = inject(Members);
  members = signal<Member[]>([]);
  // members: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: members => this.members.set(members as Member[]),
      // next: members => this.members = members
    })
  }
}
