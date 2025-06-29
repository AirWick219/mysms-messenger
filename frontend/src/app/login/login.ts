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
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (this.loading) return;
    this.loading = true;
    this.error = '';

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
          this.loading = false;
          this.router.navigate(['/messenger']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Invalid email or password';
          console.error('Login failed:', err);
        },
      });
  }
}
