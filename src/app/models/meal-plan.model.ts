export interface MealPlan {
  id?: number;
  client_id: number;
  name: string;
  description?: string;
  plan_type: 'weekly' | 'biweekly';
  start_date: string;
  end_date?: string;
  is_active: boolean;
  daily_calories?: number;
  created_by?: string;
  created_at?: string;
  days?: MealPlanDay[];
}

export interface MealPlanDay {
  id?: number;
  meal_plan_id: number;
  day_number: number;
  day_name?: string;
  date?: string;
  target_calories?: number;
  meals?: Meal[];
  created_at?: string;
}

export interface Meal {
  id?: number;
  meal_plan_day_id: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack1' | 'snack2' | 'snack3';
  name: string;
  description?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  recipe_id?: number;
  ingredients?: MealIngredient[];
  created_at?: string;
}

export interface Food {
  id?: number;
  name: string;
  brand?: string;
  category?: string;
  serving_size?: string;
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;
  is_verified: boolean;
  created_at?: string;
}

export interface MealIngredient {
  id?: number;
  meal_id: number;
  food_id: number;
  quantity: number;
  unit: string;
  food?: Food;
  created_at?: string;
}

export interface Recipe {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  difficulty_level?: 'easy' | 'medium' | 'hard';
  prep_time?: number;
  cook_time?: number;
  servings: number;
  calories_per_serving?: number;
  instructions?: string;
  is_public: boolean;
  created_by?: string;
  ingredients?: RecipeIngredient[];
  created_at?: string;
}

export interface RecipeIngredient {
  id?: number;
  recipe_id: number;
  food_id: number;
  quantity: number;
  unit: string;
  food?: Food;
  created_at?: string;
}

export interface MealPlanTemplate {
  id?: number;
  name: string;
  description?: string;
  plan_type: 'weekly' | 'biweekly';
  target_audience?: string;
  daily_calories?: number;
  protein_percentage?: number;
  carbs_percentage?: number;
  fat_percentage?: number;
  is_public: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  days?: TemplateDay[];
}

export interface TemplateDay {
  id?: number;
  template_id: number;
  day_number: number;
  day_name?: string;
  target_calories?: number;
  meals?: TemplateMeal[];
  created_at?: string;
}

export interface TemplateMeal {
  id?: number;
  template_day_id: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack1' | 'snack2' | 'snack3';
  name: string;
  description?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  recipe_id?: number;
  ingredients?: TemplateMealIngredient[];
  created_at?: string;
}

export interface TemplateMealIngredient {
  id?: number;
  template_meal_id: number;
  food_id: number;
  quantity: number;
  unit: string;
  food?: Food;
  created_at?: string;
}
