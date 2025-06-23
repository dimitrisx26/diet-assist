import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
        <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-16 shrink-0 mx-auto">
          <g transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)" fill="var(--primary-color)" stroke="none">
            <path
              d="M1074 1428 c14 -145 -34 -280 -136 -382 -72 -72 -133 -103 -263 -136
-118 -31 -179 -58 -240 -109 l-50 -41 -3 315 -2 315 -35 0 -35 0 0 -415 0
-415 35 0 c32 0 35 3 45 41 21 79 80 149 155 188 22 11 90 34 150 52 181 52
265 105 351 221 73 100 112 246 98 370 l-7 58 -35 0 -35 0 7 -62z"
            />
            <path
              d="M675 1310 c-25 -27 -22 -80 6 -102 68 -56 154 27 103 100 -20 29 -83
31 -109 2z"
            />
            <path
              d="M850 775 c-323 -90 -620 -428 -620 -706 l0 -51 32 7 c18 4 33 8 34 9
1 0 6 37 12 80 46 338 501 684 775 590 63 -21 115 -82 142 -165 19 -61 22 -64
54 -67 l34 -3 -7 54 c-12 110 -64 185 -161 234 -64 33 -209 42 -295 18z"
            />
          </g>
        </svg>
        <span>Diet Assist</span>
      </a>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
          <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
        </button>
      </div>

      <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-comments"></i>
            <span>Messages</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
          <button type="button" class="layout-topbar-action" style="color: red;" (click)="logout()">
            <i class="pi pi-sign-out"></i>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  </div>`
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(
    private auth: AuthService,
    public layoutService: LayoutService
  ) {}

  logout() {
    this.auth.signOut();
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
