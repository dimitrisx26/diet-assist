import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { MealPlanTemplate, MealPlan, MealIngredient } from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanTemplateService {
  constructor(private supabase: SupabaseService) {}

  async getTemplates(): Promise<{ data: MealPlanTemplate[] | null; error: any }> {
    try {
      const { data, error } = await this.supabase.client
        .from('meal_plan_templates')
        .select(
          `
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
        `
        )
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching templates:', error);
      return { data: null, error };
    }
  }

  async createMealPlanFromTemplate(templateId: number, clientId: number, startDate: string, name?: string): Promise<{ data: MealPlan | null; error: any }> {
    try {
      // Get current user
      const {
        data: { user }
      } = await this.supabase.client.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // First, get the template with all its data
      const { data: template, error: templateError } = await this.supabase.client
        .from('meal_plan_templates')
        .select(
          `
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
        `
        )
        .eq('id', templateId)
        .single();

      if (templateError) throw templateError;

      // Create the meal plan with created_by field
      const mealPlanData = {
        client_id: clientId,
        name: name || `${template.name} - ${new Date(startDate).toLocaleDateString()}`,
        description: template.description,
        plan_type: template.plan_type,
        start_date: startDate,
        daily_calories: template.daily_calories,
        is_active: true,
        created_by: user.id // This is crucial for RLS
      };

      const { data: mealPlan, error: planError } = await this.supabase.client.from('meal_plans').insert([mealPlanData]).select().single();

      if (planError) {
        console.error('Error creating meal plan:', planError);
        throw planError;
      }

      // Wait a moment for the trigger to create days
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Now populate the meals for each day
      if (template.days) {
        for (const templateDay of template.days) {
          // Get the corresponding meal plan day
          const { data: mealPlanDay, error: dayError } = await this.supabase.client.from('meal_plan_days').select('id').eq('meal_plan_id', mealPlan.id).eq('day_number', templateDay.day_number).single();

          if (dayError) {
            console.warn(`Could not find day ${templateDay.day_number}:`, dayError);
            continue;
          }

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

              const { data: meal, error: mealError } = await this.supabase.client.from('meals').insert([mealData]).select().single();

              if (mealError) {
                console.warn(`Could not create meal ${templateMeal.name}:`, mealError);
                continue;
              }

              // Create ingredients for this meal
              if (templateMeal.ingredients && templateMeal.ingredients.length > 0) {
                const ingredientsData = templateMeal.ingredients.map((ing: MealIngredient) => ({
                  meal_id: meal.id,
                  food_id: ing.food_id,
                  quantity: ing.quantity,
                  unit: ing.unit
                }));

                const { error: ingredientsError } = await this.supabase.client.from('meal_ingredients').insert(ingredientsData);

                if (ingredientsError) {
                  console.warn(`Could not create ingredients for meal ${templateMeal.name}:`, ingredientsError);
                }
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

  async createTemplate(template: MealPlanTemplate): Promise<{ data: MealPlanTemplate | null; error: any }> {
    try {
      // Get current user
      const {
        data: { user }
      } = await this.supabase.client.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const templateData = {
        name: template.name,
        description: template.description,
        plan_type: template.plan_type,
        target_audience: template.target_audience,
        daily_calories: template.daily_calories,
        protein_percentage: template.protein_percentage,
        carbs_percentage: template.carbs_percentage,
        fat_percentage: template.fat_percentage,
        is_public: template.is_public || false,
        created_by: user.id
      };

      const { data, error } = await this.supabase.client.from('meal_plan_templates').insert([templateData]).select().single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating template:', error);
      return { data: null, error };
    }
  }
}
