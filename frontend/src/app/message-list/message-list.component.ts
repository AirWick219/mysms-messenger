import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-list',
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  imports: [CommonModule],
})
export class MessageListComponent {
  messages: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchMessages();
  }

  fetchMessages() {
    this.http
      .get<any[]>('/api/messages', { withCredentials: true })
      .subscribe((data) => {
        this.messages = data.map((msg) => ({
          ...msg,
          formattedTime: new Intl.DateTimeFormat(undefined, {
            dateStyle: 'full',
            timeStyle: 'short',
          }).format(new Date(msg.created_at)),
          formattedPhone: this.formatPhoneNumber(msg.phone_number),
        }));
      });
  }

  formatPhoneNumber(phone: string): string {
    return phone.replace(/^1?(\d{3})(\d{3})(\d{4})$/, '1-$1-$2-$3');
  }
}
