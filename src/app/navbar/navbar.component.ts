// navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
      }
    );

    // Subscribe to role changes
    this.roleSubscription = this.authService.userRole$.subscribe(
      (role) => {
        this.userRole = role;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscriptions to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  isUser(): boolean {
    return this.userRole === 'USER';
  }
}