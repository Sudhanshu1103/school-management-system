import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { Gallery as GalleryModel } from '../../models/gallery.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  galleries: GalleryModel[] = [];
  loading = true;

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.fetchGalleries();
  }

  fetchGalleries() {
    this.loading = true;
    this.galleryService.getGalleries().subscribe({
      next: (res) => {
        this.galleries = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching gallery:', err);
        this.loading = false;
      }
    });
  }

  getImages(imagesUrl: string): string[] {
    if (!imagesUrl) return [];
    return imagesUrl.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }
}
