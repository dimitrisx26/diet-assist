import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../../services/auth.service';

interface AuthError {
  message: string;
  code?: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
  template: `
    <app-floating-configurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
            <div class="text-center mb-8">
              <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-16 shrink-0 mx-auto">
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
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Diet Assist!</div>
              <span class="text-muted-color font-medium">Sign in to continue</span>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
              <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
              <input pInputText id="email1" type="email" placeholder="Email address" class="w-full md:w-[30rem] mb-8" formControlName="email" />

              <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
              <p-password id="password1" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" formControlName="password"></p-password>

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <div class="flex items-center">
                  <p-checkbox id="rememberme1" binary class="mr-2" formControlName="rememberMe"></p-checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
              </div>
              <p-button [icon]="loading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'" [label]="loading ? 'Signing In...' : 'Sign In'" styleClass="w-full" type="submit" [disabled]="loginForm.invalid || loading"> </p-button>
            </form>
            <div *ngIf="error" class="text-red-500 text-sm mt-2">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Login {
  loginForm!: FormGroup;

  loading = false;

  error: string | null = null;

  rememberME = signal(false);

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.rememberME.set(this.auth.isRemembered());
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      const { email, password, rememberMe } = this.loginForm.value;
      const { data, error } = await this.auth.signIn(email, password, rememberMe);

      if (error) {
        this.error = (error as AuthError)?.message || 'An error occurred during sign in';
      }

      this.loading = false;
    }
  }
}
