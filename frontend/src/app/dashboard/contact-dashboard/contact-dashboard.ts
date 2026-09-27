import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  contacts: Contact[] = [];
  constructor(private service: ContactService) { this.load(); }
  load(): void { this.service.getContacts().subscribe(res => this.contacts = res.data || []); }
  remove(id?: string): void { if (id && confirm('Delete this message?')) this.service.deleteContact(id).subscribe(() => this.load()); }

}
