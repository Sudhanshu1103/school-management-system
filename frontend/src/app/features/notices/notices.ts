import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../models/notice.model';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notices.html',
  styleUrl: './notices.scss',
})
export class Notices implements OnInit {
  notices: Notice[] = [];
  selectedNotice: Notice | null = null;
  loading = true;

  constructor(private noticeService: NoticeService) {}

  ngOnInit() {
    this.fetchNotices();
  }

  fetchNotices() {
    this.loading = true;
    this.noticeService.getNotices().subscribe({
      next: (res) => {
        this.notices = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notices:', err);
        this.loading = false;
      }
    });
  }

  openDetails(notice: Notice) {
    this.selectedNotice = notice;
  }
}
