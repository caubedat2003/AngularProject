import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;
  username: string | null = null;

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (token) {
      // Optionally decode token or store username in localStorage after login
      this.username = localStorage.getItem('username') || 'User';
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
