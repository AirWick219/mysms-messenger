import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post(
        '/api/session',
        {
          email_address: this.email,
          password: this.password,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/messenger']);
        },
        error: (err) => {
          this.error = 'Invalid email or password';
          console.error('Login failed:', err);
        },
      });
  }
}
