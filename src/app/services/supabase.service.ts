import { computed, Injectable, signal } from '@angular/core';
import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private _user = signal<User | null>(null);
  public readonly user = this._user.asReadonly();

  private _session = signal<Session | null>(null);
  public readonly session = this._session.asReadonly();

  public readonly isAuth = computed(() => !!this._session());

  get client() {
    return this.supabase;
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Initialize with current session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this._session.set(session);
      this._user.set(session?.user ?? null);
    });

    //Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session.set(session);
      this._user.set(session?.user ?? null);
    });
  }

  authStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(name: string, email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

}
