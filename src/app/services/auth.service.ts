import { Injectable, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { MessageService } from 'primeng/api';

export interface User {
  id: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Private signals for state management
  private _currentUser = signal<User | null>(null);
  private _session = signal<any>(null);
  private _isLoading = signal<boolean>(true);
  private _initialized = signal<boolean>(false);

  // Public readonly signals
  readonly currentUser = this._currentUser.asReadonly();
  readonly session = this._session.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly initialized = this._initialized.asReadonly();

  // Computed signals
  readonly isAuthenticated = computed(() => !!this._currentUser());
  readonly isRemembered = computed(() => (typeof window !== 'undefined' ? localStorage.getItem('rememberMe') === 'true' : false));

  constructor(
    private message: MessageService,
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.initializeAuthState();
    this.setupAuthStateListener();

    effect(() => {
      const user = this._currentUser();
      const session = this._session();
    });
  }

  private setupAuthStateListener() {
    this.supabase.authStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          if (session) {
            this.updateAuthState(session);
          }
          break;
        case 'SIGNED_OUT':
          this.clearAuthState();
          if (typeof window !== 'undefined') {
            localStorage.removeItem('rememberMe');
          }
          break;
        case 'TOKEN_REFRESHED':
          if (session) {
            this.updateAuthState(session);
          }
          break;
      }
    });
  }

  private async initializeAuthState() {
    try {
      this._isLoading.set(true);

      // Get current session from Supabase
      const session = await this.supabase.session();

      if (session?.user) {
        this.updateAuthState(session);
      } else {
        this.clearAuthState();
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      this.message.add({
        severity: 'error',
        summary: 'Authentication Error',
        detail: 'Failed to restore session'
      });
      this.clearAuthState();
    } finally {
      this._isLoading.set(false);
      this._initialized.set(true);
    }
  }

  private updateAuthState(session: any) {
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || session.user.email
      };

      this._currentUser.set(user);
      this._session.set(session);
    }
  }

  private clearAuthState() {
    this._currentUser.set(null);
    this._session.set(null);
  }

  async signUp(name: string, email: string, password: string) {
    try {
      this._isLoading.set(true);
      const { data, error } = await this.supabase.signUp(name, email, password);

      if (error) throw error;

      if (data.session) {
        this.updateAuthState(data.session);
      }

      this.router.navigate(['/']);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      this._isLoading.set(false);
    }
  }

  async signIn(email: string, password: string, rememberMe: boolean = false) {
    try {
      this._isLoading.set(true);
      const { data, error } = await this.supabase.signIn(email, password);

      if (error) throw error;

      if (data.session) {
        this.updateAuthState(data.session);

        // Store remember me preference
        if (typeof window !== 'undefined') {
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
        }
      }

      this.router.navigate(['/']);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      this._isLoading.set(false);
    }
  }

  async signOut() {
    try {
      this._isLoading.set(true);
      const { error } = await this.supabase.signOut();
      if (error) throw error;

      this.clearAuthState();

      if (typeof window !== 'undefined') {
        localStorage.removeItem('rememberMe');
      }

      this.router.navigate(['/auth/login']);
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      this._isLoading.set(false);
    }
  }

  // Get current session
  async getSession() {
    try {
      const session = await this.supabase.session();
      if (session) {
        this.updateAuthState(session);
      }
      return { data: session, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async refreshSession() {
    try {
      this._isLoading.set(true);
      const session = await this.supabase.session();
      if (session) {
        this.updateAuthState(session);
        return { data: session, error: null };
      } else {
        this.clearAuthState();
        return { data: null, error: 'No active session' };
      }
    } catch (error) {
      this.clearAuthState();
      return { data: null, error };
    } finally {
      this._isLoading.set(false);
    }
  }

  // Method to manually trigger loading state
  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }
}
