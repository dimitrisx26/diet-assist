import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    @if (auth.isLoading()) {
      <div class="loading-container">
        <div class="loading-content">
          <p class="loading-text">Loading...</p>
        </div>
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: var(--surface-ground);
      }

      .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .loading-text {
        color: var(--text-color-secondary);
        font-size: 1rem;
        margin: 0;
      }

      :host ::ng-deep .p-progress-spinner-circle {
        stroke: var(--primary-color);
      }
    `
  ]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
