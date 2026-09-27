import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  form: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.createContact(this.form.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.successMessage = 'Thank you! Your message has been sent successfully.';
        this.form.reset();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Failed to send message. Please try again.';
      }
    });
  }
}
