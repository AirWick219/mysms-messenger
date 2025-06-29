import { Component, ViewChild } from '@angular/core';
import { MessageForm } from '../message-form/message-form';
import { MessageHistory } from '../message-history/message-history';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-messenger-layout',
  imports: [MessageForm, MessageHistory],
  templateUrl: './messenger-layout.html',
  styleUrls: ['./messenger-layout.scss'],
})

export class MessengerLayout {
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<{ logged_in: boolean }>('/api/session_status', {
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).subscribe({
      next: (response) => {
        if (!response.logged_in) {
          this.router.navigate(['/login']);
        }
      },
      error: () => this.router.navigate(['/login'])
    });
  }

  @ViewChild(MessageHistory)
  messageList!: MessageHistory;

  onMessageSent() {
    this.messageList.fetchMessages();
  }

  logout() {
    if (this.loading) return;
    this.loading = true;

    this.http.delete('/api/session', { withCredentials: true }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Logout failed:', err);
      },
    });
  }
}
