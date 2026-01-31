import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth-service';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  currentUser = this.authService.user$;

  onLogout() {
    this.authService.Logout();

}
}