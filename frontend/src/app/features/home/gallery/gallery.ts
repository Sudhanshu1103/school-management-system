import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery as GalleryModel } from '../../../models/gallery.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  galleries: GalleryModel[] = [];

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService.getGalleries().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.galleries = res.data.slice(0, 4);
        }
      },
      error: (err) => console.error('Error fetching galleries:', err)
    });
  }

  getFirstImage(imagesUrl: string): string {
    if (!imagesUrl) return 'assets/images/gallery/image.png';
    const urls = imagesUrl.split(',').map(s => s.trim());
    return urls[0] || 'assets/images/gallery/image.png';
  }
}
