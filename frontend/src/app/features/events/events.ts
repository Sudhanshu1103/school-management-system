import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { SchoolEvent } from '../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  events: SchoolEvent[] = [];
  selectedEvent: SchoolEvent | null = null;
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.loading = false;
      }
    });
  }

  openDetails(event: SchoolEvent) {
    this.selectedEvent = event;
  }
}
