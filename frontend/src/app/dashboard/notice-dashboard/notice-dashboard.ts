import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../models/notice.model';

@Component({
  selector: 'app-notice-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  notices: Notice[] = [];
  editingId: string | null = null;
  form: Notice = { title: '', description: '', category: '', date: '' };
  constructor(private service: NoticeService) { this.load(); }
  load(): void { this.service.getNotices().subscribe(res => this.notices = res.data || []); }
  edit(item: Notice): void { this.editingId = item._id || null; this.form = { ...item, date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '' }; }
  save(): void { const request = this.editingId ? this.service.updateNotice(this.editingId, this.form) : this.service.createNotice(this.form); request.subscribe(() => { this.form = { title: '', description: '', category: '', date: '' }; this.editingId = null; this.load(); }); }
  remove(id?: string): void { if (id && confirm('Delete this notice?')) this.service.deleteNotice(id).subscribe(() => this.load()); }

}
