import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';
import { AuthService } from '../../pages/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AppMenu],
  template: `
    <div class="layout-sidebar">
      <!-- Main Menu -->
      <div class="flex-1 overflow-y-auto">
        <app-menu></app-menu>
      </div>

      <!-- Logout Section -->
      <div class="p-4 border-t border-gray-100/10">
        <a routerLink="/auth/login" class="flex items-center w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-500/10 rounded-lg transition-all duration-200 group cursor-pointer" (click)="logout()">
          <i class="pi pi-sign-out text-lg mr-3 group-hover:scale-110 transition-transform duration-200"></i>
          <span class="font-medium">Log out</span>
        </a>
      </div>
    </div>
  `
})
export class AppSidebar {
  constructor(
    private auth: AuthService,
    public el: ElementRef
  ) {}

  logout() {
    this.auth.signOut();
  }
}
