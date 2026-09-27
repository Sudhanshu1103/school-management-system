import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { Gallery } from '../../models/gallery.model';

@Component({
  selector: 'app-gallery-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss'
})
export class GalleryDashboard {
  galleries: Gallery[] = [];
  editingId: string | null = null;
  form: Gallery = { title: '', imagesUrl: '', date: '' };
  constructor(private service: GalleryService) { this.load(); }
  load(): void { this.service.getGalleries().subscribe(res => this.galleries = res.data || []); }
  edit(item: Gallery): void { this.editingId = item._id || null; this.form = { ...item, date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '' }; }
  save(): void { const request = this.editingId ? this.service.updateGallery(this.editingId, this.form) : this.service.createGallery(this.form); request.subscribe(() => { this.form = { title: '', imagesUrl: '', date: '' }; this.editingId = null; this.load(); }); }
  remove(id?: string): void { if (id && confirm('Delete this gallery item?')) this.service.deleteGallery(id).subscribe(() => this.load()); }

}
