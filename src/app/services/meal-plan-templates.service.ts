import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { MealPlanTemplate, TemplateDay, TemplateMeal, MealPlan, MealIngredient } from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanTemplateService {
  private templates = signal<MealPlanTemplate[]>([]);

  constructor(private supabase: SupabaseService) {}

  async getTemplates(): Promise<{ data: MealPlanTemplate[] | null; error: any }> {
    try {
      const { data, error } = await this.supabase.client
        .from('meal_plan_templates')
        .select(`
          *,
          days:template_days(
            *,
            meals:template_meals(
              *,
              ingredients:template_meal_ingredients(
                *,
                food:foods(*)
              )
            )
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching templates:', error);
      return { data: null, error };
    }
  }

  async getTemplatesByAudience(audience: string): Promise<{ data: MealPlanTemplate[] | null; error: any }> {
    try {
      const { data, error } = await this.supabase.client
        .from('meal_plan_templates')
        .select('*')
        .eq('target_audience', audience)
        .eq('is_public', true);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async createTemplate(template: Partial<MealPlanTemplate>): Promise<{ data: MealPlanTemplate | null; error: any }> {
    try {
      const { data, error } = await this.supabase.client
        .from('meal_plan_templates')
        .insert([template])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async createMealPlanFromTemplate(templateId: number, clientId: number, startDate: string, name?: string): Promise<{ data: MealPlan | null; error: any }> {
    try {
      // First, get the template with all its data
      const { data: template, error: templateError } = await this.supabase.client
        .from('meal_plan_templates')
        .select(`
          *,
          days:template_days(
            *,
            meals:template_meals(
              *,
              ingredients:template_meal_ingredients(
                *,
                food:foods(*)
              )
            )
          )
        `)
        .eq('id', templateId)
        .single();

      if (templateError) throw templateError;

      // Create the meal plan
      const mealPlanData = {
        client_id: clientId,
        name: name || `${template.name} - ${new Date(startDate).toLocaleDateString()}`,
        description: template.description,
        plan_type: template.plan_type,
        start_date: startDate,
        daily_calories: template.daily_calories,
        is_active: true
      };

      const { data: mealPlan, error: planError } = await this.supabase.client
        .from('meal_plans')
        .insert([mealPlanData])
        .select()
        .single();

      if (planError) throw planError;

      // The days will be created automatically by the trigger
      // Now we need to populate the meals for each day
      if (template.days) {
        for (const templateDay of template.days) {
          // Get the corresponding meal plan day
          const { data: mealPlanDay, error: dayError } = await this.supabase.client
            .from('meal_plan_days')
            .select('id')
            .eq('meal_plan_id', mealPlan.id)
            .eq('day_number', templateDay.day_number)
            .single();

          if (dayError) continue;

          // Create meals for this day
          if (templateDay.meals) {
            for (const templateMeal of templateDay.meals) {
              const mealData = {
                meal_plan_day_id: mealPlanDay.id,
                meal_type: templateMeal.meal_type,
                name: templateMeal.name,
                description: templateMeal.description,
                calories: templateMeal.calories,
                protein_g: templateMeal.protein_g,
                carbs_g: templateMeal.carbs_g,
                fat_g: templateMeal.fat_g,
                recipe_id: templateMeal.recipe_id
              };

              const { data: meal, error: mealError } = await this.supabase.client
                .from('meals')
                .insert([mealData])
                .select()
                .single();

              if (mealError) continue;

              if (templateMeal.ingredients) {
                const ingredientsData = templateMeal.ingredients.map((ing: MealIngredient) => ({
                  meal_id: meal.id,
                  food_id: ing.food_id,
                  quantity: ing.quantity,
                  unit: ing.unit
                }));

                await this.supabase.client
                  .from('meal_ingredients')
                  .insert(ingredientsData);
              }
            }
          }
        }
      }

      return { data: mealPlan, error: null };
    } catch (error) {
      console.error('Error creating meal plan from template:', error);
      return { data: null, error };
    }
  }
}