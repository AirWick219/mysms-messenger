import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-history',
  standalone: true,
  templateUrl: './message-history.html',
  styleUrls: ['./message-history.scss'],
  imports: [CommonModule],
})
export class MessageHistory {
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

  getStatusClass(status: string) {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'sent': return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  }

  formatPhoneNumber(phone: string): string {
    return phone.replace(/^1?(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
  }
}
