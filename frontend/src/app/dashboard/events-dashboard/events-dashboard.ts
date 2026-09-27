import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SchoolEvent } from '../../models/event.model';

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  events: SchoolEvent[] = [];
  editingId: string | null = null;
  form: SchoolEvent = this.emptyForm();

  constructor(private eventService: EventService) { this.load(); }

  load(): void { this.eventService.getEvents().subscribe(res => this.events = res.data || []); }
  edit(event: SchoolEvent): void { this.editingId = event._id || null; this.form = { ...event, date: this.formatDate(event.date) }; }
  save(): void {
    const request = this.editingId ? this.eventService.updateEvent(this.editingId, this.form) : this.eventService.createEvent(this.form);
    request.subscribe(() => { this.form = this.emptyForm(); this.editingId = null; this.load(); });
  }
  remove(id?: string): void { if (id && confirm('Delete this event?')) this.eventService.deleteEvent(id).subscribe(() => this.load()); }
  emptyForm(): SchoolEvent { return { title: '', description: '', shortDescription: '', date: '', location: '' }; }
  private formatDate(date: string | Date): string { return date ? new Date(date).toISOString().slice(0, 10) : ''; }

}
