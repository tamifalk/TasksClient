import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/service/auth-service';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { LoadingService } from './core/service/loading-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Footer,MatProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TeamTasks');
  authService = inject(AuthService);
  public loadingService = inject(LoadingService); 
}
