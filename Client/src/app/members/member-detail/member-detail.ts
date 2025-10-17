import { Component, inject, OnInit, signal } from '@angular/core';
import { Members } from '../../_services/members';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit{
  private memberService = inject(Members);
  private route = inject(ActivatedRoute);
  member = signal<Member | null>(null);
  images = signal<GalleryItem[]>([]);


  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    console.log('Username from route:', username); // <- ADD THIS
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member.set(member as Member);
        member.photos.map(p => {
          this.images().push(new ImageItem({
            src: p.url,
            thumb: p.url
          }));
        });
      }
    })
  }

}
