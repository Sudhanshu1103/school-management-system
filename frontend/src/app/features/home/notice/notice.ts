import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticeService } from '../../../services/notice.service';
import { Notice as NoticeModel } from '../../../models/notice.model';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
})
export class Notice implements OnInit {
  notices: NoticeModel[] = [];

  constructor(private noticeService: NoticeService) {}

  ngOnInit() {
    this.noticeService.getNotices().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.notices = res.data;
        }
      },
      error: (err) => console.error('Error fetching notices:', err)
    });
  }
}
