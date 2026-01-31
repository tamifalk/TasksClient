import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth-service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [MatIcon],
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