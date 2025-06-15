import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private supabase: SupabaseService,
        private router: Router
    ) {}

    async signUp(name: string, email: string, password: string) {
        try {
            const { data, error } = await this.supabase.signUp(name, email, password);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async signIn(email: string, password: string) {
        try {
            const { data, error } = await this.supabase.signIn(email, password);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.signOut();
            if (error) throw error;
            this.router.navigate(['/login']);
            return { error: null };
        } catch (error) {
            return { error };
        }
    }

    // Get current session
    async getSession() {
        try {
            const session = await this.supabase.session();
            return { data: session, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }
}
