import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  standalone: true,
  templateUrl: './message-form.html',
  styleUrls: ['./message-form.scss'],
  imports: [CommonModule, FormsModule],
})
export class MessageForm {
  phoneNumber = '';
  body: string = '';
  loading = false;

  constructor(private http: HttpClient) {}

  @Output() messageSent = new EventEmitter<void>();

  sendMessage(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;

    const phone = this.phoneNumber.trim();
    const message = this.body.trim();

    if (!phone || !message || !/^\d{11}$/.test(phone)) {
      console.warn('Invalid input');
      return;
    }

    this.http
      .post(
        '/api/messages',
        {
          phone_number: phone,
          body: message,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          this.messageSent.emit();
          form.resetForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to send message:', err);
          this.loading = false;
        },
      });
  }

  clear() {
    this.phoneNumber = '';
    this.body = '';
  }
}
