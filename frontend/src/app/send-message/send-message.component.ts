import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-message',
  standalone: true,
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SendMessageComponent {
  phoneNumber = '';
  body = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  @Output() messageSent = new EventEmitter<void>();

  sendMessage() {
    this.http
      .post(
        '/api/messages',
        {
          phone_number: this.phoneNumber,
          body: this.body,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      .subscribe({
        next: () => {
          this.messageSent.emit();
          this.clear();
        },
        error: (err) => {
          console.error('Failed to send message:', err);
        },
      });
  }

  clear() {
    this.phoneNumber = '';
    this.body = '';
  }
}
