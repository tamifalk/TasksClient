import { Component, inject, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { AuthService } from './core/service/auth-service';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { Header } from "./shared/components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TeamTasks');
  authService=inject(AuthService);
}
