import { Component } from '@angular/core';
import { MessageForm } from './message-form/message-form';
import { MessageHistory } from './message-history/message-history';
import { Login } from './login/login';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {}
