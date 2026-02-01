import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/service/auth-service';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {
  constructor(
    private authService: AuthService, 
    private router: Router // עכשיו זה ה-Router הנכון של אנגולר
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }
}
