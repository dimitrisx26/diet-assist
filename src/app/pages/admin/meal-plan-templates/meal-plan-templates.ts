import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { MealPlanTemplate } from '../../../models/meal-plan.model';
import { MessageService } from 'primeng/api';
import { MealPlanTemplateService } from '../../../services/meal-plan-templates.service';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-meal-plan-templates',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TagModule, DialogModule, InputTextModule, DatePicker, FormsModule, ToastModule, SkeletonModule],
  template: `
    <div class="card">
      <h3>Meal Plan Templates</h3>
      <p class="text-gray-600 mb-6">Choose from pre-designed meal plans for different dietary goals</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (loading()) {
          <!-- Skeleton cards for loading state -->
          @for (skeleton of skeletonItems; track $index) {
            <p-card styleClass="h-full bg-gray-50 border border-gray-200">
              <ng-template #header>
                <p-skeleton height="1.5rem" width="70%" />
              </ng-template>

              <ng-template #content>
                <div class="space-b-4">
                  <p-skeleton height="1rem" width="100%" />
                  <p-skeleton height="1rem" width="85%" />
                  <p-skeleton height="1rem" width="60%" />

                  <div class="flex flex-wrap gap-2 mt-4">
                    <p-skeleton height="1.25rem" width="4rem" borderRadius="12px" />
                    <p-skeleton height="1.25rem" width="3rem" borderRadius="12px" />
                    <p-skeleton height="1.25rem" width="3.5rem" borderRadius="12px" />
                  </div>

                  <div class="text-xs space-y-1 mt-3">
                    <p-skeleton height="0.75rem" width="50%" />
                    <p-skeleton height="0.75rem" width="45%" />
                    <p-skeleton height="0.75rem" width="40%" />
                  </div>
                </div>
              </ng-template>

              <ng-template #footer>
                <div class="flex gap-2">
                  <p-skeleton height="2rem" width="4rem" borderRadius="6px" />
                  <p-skeleton height="2rem" width="5rem" borderRadius="6px" />
                </div>
              </ng-template>
            </p-card>
          }
        } @else {
          <!-- Actual template cards -->
          @for (template of templates(); track template.id) {
            <p-card [header]="template.name" styleClass="h-full bg-gray-50 border border-gray-200">
              <ng-template #content>
                <div class="space-y-4">
                  <p class="text-sm text-gray-600">{{ template.description }}</p>

                  <div class="flex flex-wrap gap-2">
                    <p-tag [value]="template.target_audience" [severity]="getAudienceSeverity(template.target_audience)" />
                    <p-tag [value]="template.plan_type" severity="info" />
                    <p-tag [value]="template.daily_calories + ' cal'" severity="warning" />
                  </div>

                  @if (template.protein_percentage || template.carbs_percentage || template.fat_percentage) {
                    <div class="text-xs text-gray-500">
                      <div>Protein: {{ template.protein_percentage }}%</div>
                      <div>Carbs: {{ template.carbs_percentage }}%</div>
                      <div>Fat: {{ template.fat_percentage }}%</div>
                    </div>
                  }
                </div>
              </ng-template>

              <ng-template #footer>
                <div class="flex gap-2">
                  <p-button label="Preview" icon="pi pi-eye" severity="secondary" size="small" (onClick)="previewTemplate(template)" />
                  <p-button label="Use Template" icon="pi pi-plus" size="small" (onClick)="showCreateDialog(template)" />
                </div>
              </ng-template>
            </p-card>
          }

          <!-- Empty state when no templates and not loading -->
          @if (templates().length === 0) {
            <div class="col-span-full flex flex-col items-center justify-center py-16">
              <i class="pi pi-clone text-6xl text-gray-400 mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">No Templates Available</h3>
              <p class="text-gray-500">There are currently no meal plan templates in the system.</p>
            </div>
          }
        }
      </div>
    </div>

    <!-- Create Meal Plan Dialog -->
    <p-dialog header="Create Meal Plan from Template" [(visible)]="showDialog" [modal]="true" [style]="{ width: '450px' }">
      @if (selectedTemplate) {
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Template</label>
            <p class="text-gray-600">{{ selectedTemplate.name }}</p>
          </div>

          <div>
            <label for="planName" class="block text-sm font-medium mb-2">Plan Name</label>
            <input pInputText id="planName" [(ngModel)]="newPlanName" class="w-full" placeholder="My Custom Meal Plan" />
          </div>

          <div>
            <label for="startDate" class="block text-sm font-medium mb-2">Start Date</label>
            <p-datepicker [(ngModel)]="startDate" [showIcon]="true" appendTo="body" inputId="startDate" class="w-full" />
          </div>

          <div>
            <label for="clientId" class="block text-sm font-medium mb-2">Client ID</label>
            <input pInputText id="clientId" [(ngModel)]="clientId" type="number" class="w-full" placeholder="Enter client ID" />
          </div>
        </div>

        <ng-template #footer>
          <div class="flex justify-end gap-2 mt-4">
            <p-button label="Cancel" severity="secondary" (onClick)="hideDialog()" />
            <p-button label="Create Plan" (onClick)="createPlan()" [loading]="creating()" />
          </div>
        </ng-template>
      }
    </p-dialog>

    <p-toast />
  `
})
export class MealPlanTemplatesComponent implements OnInit {
  templates = signal<MealPlanTemplate[]>([]);
  loading = signal(false);
  creating = signal(false);

  // Skeleton items for loading state
  skeletonItems = Array(6).fill({}); // Show 6 skeleton cards

  showDialog = false;
  selectedTemplate: MealPlanTemplate | null = null;
  newPlanName = '';
  startDate: Date | null = null;
  clientId: number | null = null;

  constructor(
    private templateService: MealPlanTemplateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTemplates();
  }

  async loadTemplates() {
    this.loading.set(true);
    try {
      // Add a small delay to show skeleton effect (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { data, error } = await this.templateService.getTemplates();
      if (error) {
        throw error;
      }
      this.templates.set(data || []);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load templates'
      });
    } finally {
      this.loading.set(false);
    }
  }

  getAudienceSeverity(audience?: string): string {
    const severityMap: { [key: string]: string } = {
      weight_loss: 'danger',
      muscle_gain: 'success',
      maintenance: 'info',
      keto: 'warning',
      vegetarian: 'success'
    };
    return severityMap[audience || ''] || 'info';
  }

  previewTemplate(template: MealPlanTemplate) {
    // Navigate to template preview or show detailed view
    this.messageService.add({
      severity: 'info',
      summary: 'Preview',
      detail: `Showing preview for ${template.name}`
    });
  }

  showCreateDialog(template: MealPlanTemplate) {
    this.selectedTemplate = template;
    this.newPlanName = `${template.name} - ${new Date().toLocaleDateString()}`;
    this.startDate = new Date();
    this.showDialog = true;
  }

  hideDialog() {
    this.showDialog = false;
    this.selectedTemplate = null;
    this.newPlanName = '';
    this.startDate = null;
    this.clientId = null;
  }

  async createPlan() {
    if (!this.selectedTemplate || !this.startDate || !this.clientId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill in all required fields'
      });
      return;
    }

    this.creating.set(true);
    try {
      const { data, error } = await this.templateService.createMealPlanFromTemplate(this.selectedTemplate.id!, this.clientId, this.startDate.toISOString().split('T')[0], this.newPlanName);

      if (error) throw error;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Meal plan created successfully!'
      });

      this.hideDialog();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create meal plan'
      });
    } finally {
      this.creating.set(false);
    }
  }
}
