import { Component, ViewChild } from '@angular/core';
import { SendMessageComponent } from '../send-message/send-message.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-messenger',
  imports: [SendMessageComponent, MessageListComponent],
  templateUrl: './messenger.html',
  styleUrls: ['./messenger.scss'],
})
export class MessengerComponent {
  constructor(private http: HttpClient, private router: Router) {}

  @ViewChild(MessageListComponent)
  messageList!: MessageListComponent;

  onMessageSent() {
    this.messageList.fetchMessages();
  }

  logout() {
    this.http.delete('/api/session', { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}