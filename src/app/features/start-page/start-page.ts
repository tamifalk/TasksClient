import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-start-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule, MatIconModule],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {
  
}
