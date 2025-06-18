export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'super_active';
  medical_conditions?: string[];
  allergies?: string[];
  dietary_preferences?: string[];
  goals?: string[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'super_active';
  medical_conditions?: string[];
  allergies?: string[];
  dietary_preferences?: string[];
  goals?: string[];
  notes?: string;
}