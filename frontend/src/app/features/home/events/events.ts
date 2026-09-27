import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { SchoolEvent } from '../../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  events: SchoolEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.events = res.data;
        }
      },
      error: (err) => console.error('Error fetching events:', err)
    });
  }
}
