import { Injectable, signal } from '@angular/core';
import { Client, ClientFormData } from '../models/client.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _clients = signal<Client[]>([]);
  public readonly clients = this._clients.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  constructor(private supabaseService: SupabaseService) {}

  async createClient(clientData: ClientFormData): Promise<{ data: Client | null; error: any }> {
    this._loading.set(true);

    const user = this.supabaseService.user();
    if (!user) {
      this._loading.set(false);
      return { data: null, error: { message: 'User not authenticated' } };
    }

    try {
      const { data, error } = await this.supabaseService.client
        .from('clients')
        .insert([{
          ...clientData,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (!error && data) {
        const currentClients = this._clients();
        this._clients.set([...currentClients, data]);
      }

      this._loading.set(false);
      return { data, error };
    } catch (err) {
      this._loading.set(false);
      return { data: null, error: err };
    }
  }

  async getClients(): Promise<{ data: Client[] | null; error: any }> {
    this._loading.set(true);

    const user = this.supabaseService.user();
    if (!user) {
      this._loading.set(false);
      return { data: null, error: { message: 'User not authenticated' } };
    }

    try {
      const { data, error } = await this.supabaseService.client
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        this._clients.set(data);
      }

      this._loading.set(false);
      return { data, error };
    } catch (err) {
      this._loading.set(false);
      return { data: null, error: err };
    }
  }

  async getClientById(id: string): Promise<{ data: Client | null; error: any }> {
    this._loading.set(true);

    const user = this.supabaseService.user();
    if (!user) {
      this._loading.set(false);
      return { data: null, error: { message: 'User not authenticated' } };
    }

    try {
      const { data, error } = await this.supabaseService.client
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      this._loading.set(false);
      return { data, error };
    } catch (err) {
      this._loading.set(false);
      return { data: null, error: err };
    }
  }

  async updateClient(id: string, clientData: Partial<ClientFormData>): Promise<{ data: Client | null; error: any }> {
    this._loading.set(true);

    const user = this.supabaseService.user();
    if (!user) {
      this._loading.set(false);
      return { data: null, error: { message: 'User not authenticated' } };
    }

    try {
      const { data, error } = await this.supabaseService.client
        .from('clients')
        .update({
          ...clientData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (!error && data) {
        const currentClients = this._clients();
        const updatedClients = currentClients.map(client => 
          client.id === id ? data : client
        );
        this._clients.set(updatedClients);
      }

      this._loading.set(false);
      return { data, error };
    } catch (err) {
      this._loading.set(false);
      return { data: null, error: err };
    }
  }

  async deleteClient(id: string): Promise<{ error: any }> {
    this._loading.set(true);

    const user = this.supabaseService.user();
    if (!user) {
      this._loading.set(false);
      return { error: { message: 'User not authenticated' } };
    }

    try {
      const { error } = await this.supabaseService.client
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (!error) {
        const currentClients = this._clients();
        const filteredClients = currentClients.filter(client => client.id !== id);
        this._clients.set(filteredClients);
      }

      this._loading.set(false);
      return { error };
    } catch (err) {
      this._loading.set(false);
      return { error: err };
    }
  }

  // Helper method to calculate BMI
  calculateBMI(height: number, weight: number): number {
    return weight / Math.pow(height / 100, 2);
  }

  // Helper method to get BMI category
  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  // Helper method to calculate BMR (Basal Metabolic Rate)
  calculateBMR(weight: number, height: number, age: number, gender: string): number {
    // Mifflin-St Jeor Equation
    const bmr = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? bmr + 5 : bmr - 161;
  }

  // Helper method to calculate daily calorie needs
  calculateDailyCalories(bmr: number, activityLevel: string): number {
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      super_active: 1.9
    };

    return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
  }
}
