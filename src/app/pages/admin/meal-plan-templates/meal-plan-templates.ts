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
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MealPlanTemplate } from '../../../models/meal-plan.model';
import { Client } from '../../../models/client.model';
import { MessageService } from 'primeng/api';
import { MealPlanTemplateService } from '../../../services/meal-plan-templates.service';
import { ClientService } from '../../../services/client.service';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-meal-plan-templates',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TagModule, DialogModule, InputTextModule, DatePicker, FormsModule, ToastModule, SkeletonModule, MultiSelectModule, SelectModule, TextareaModule, InputNumberModule],
  template: `
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3>Meal Plan Templates</h3>
          <p class="text-gray-600">Choose from pre-designed meal plans for different dietary goals</p>
        </div>
        <p-button label="Create Template" icon="pi pi-plus" (onClick)="openCreateTemplateDialog()" severity="success" />
      </div>

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
                <div class="flex gap-2 justify-between">
                  <div class="flex gap-2">
                    <p-button label="Preview" icon="pi pi-eye" severity="secondary" size="small" (onClick)="previewTemplate(template)" />
                    <p-button label="Use Template" icon="pi pi-plus" size="small" (onClick)="showCreateDialog(template)" />
                  </div>
                  <p-button icon="pi pi-trash" severity="danger" size="small" (onClick)="deleteTemplate(template)" />
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

    <!-- Create Template Dialog -->
    <p-dialog header="Create New Meal Plan Template" [(visible)]="showCreateTemplateDialog" [modal]="true" [style]="{ width: '650px' }" [appendTo]="'body'">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="templateName" class="block text-sm font-medium mb-2"> Template Name <span class="text-red-500">*</span> </label>
            <input pInputText id="templateName" [(ngModel)]="newTemplate.name" class="w-full" placeholder="e.g., Weight Loss Plan" />
          </div>

          <div>
            <label for="planType" class="block text-sm font-medium mb-2"> Plan Type <span class="text-red-500">*</span> </label>
            <p-select [(ngModel)]="newTemplate.plan_type" [options]="planTypeOptions" appendTo="body" optionLabel="label" optionValue="value" placeholder="Select plan type" class="w-full" />
          </div>
        </div>

        <div>
          <label for="templateDescription" class="block text-sm font-medium mb-2">Description</label>
          <textarea pTextarea id="templateDescription" [(ngModel)]="newTemplate.description" class="w-full" rows="3" placeholder="Describe this meal plan template..."></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="targetAudience" class="block text-sm font-medium mb-2">Target Audience <span class="text-red-500">*</span> </label>
            <p-select [(ngModel)]="newTemplate.target_audience" [options]="audienceOptions" appendTo="body" optionLabel="label" optionValue="value" placeholder="Select target audience" class="w-full" />
          </div>

          <div>
            <label for="dailyCalories" class="block text-sm font-medium mb-2">Daily Calories</label>
            <p-inputnumber [(ngModel)]="newTemplate.daily_calories" [min]="800" [max]="5000" placeholder="2000" class="w-full" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="proteinPercentage" class="block text-sm font-medium mb-2">Protein %</label>
            <p-inputnumber [(ngModel)]="newTemplate.protein_percentage" [min]="0" [max]="100" suffix="%" placeholder="30" class="w-full" />
          </div>

          <div>
            <label for="carbsPercentage" class="block text-sm font-medium mb-2">Carbs %</label>
            <p-inputnumber [(ngModel)]="newTemplate.carbs_percentage" [min]="0" [max]="100" suffix="%" placeholder="40" class="w-full" />
          </div>

          <div>
            <label for="fatPercentage" class="block text-sm font-medium mb-2">Fat %</label>
            <p-inputnumber [(ngModel)]="newTemplate.fat_percentage" [min]="0" [max]="100" suffix="%" placeholder="30" class="w-full" />
          </div>
        </div>

        @if (macroPercentageError) {
          <div class="text-red-500 text-sm">
            <i class="pi pi-exclamation-triangle mr-1"></i>
            Macro percentages should add up to 100%
          </div>
        }
      </div>

      <ng-template #footer>
        <div class="flex justify-end gap-2 mt-4">
          <p-button label="Cancel" severity="secondary" (onClick)="hideCreateTemplateDialog()" />
          <p-button label="Create Template" (onClick)="createTemplate()" [loading]="creatingTemplate()" [disabled]="!isTemplateFormValid()" />
        </div>
      </ng-template>
    </p-dialog>

    <!-- Create Meal Plan Dialog -->
    <p-dialog header="Create Meal Plan from Template" [(visible)]="showDialog" [modal]="true" [style]="{ width: '550px' }" [appendTo]="'body'">
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
            <label for="clients" class="block text-sm font-medium mb-2">
              Select Clients
              <span class="text-red-500">*</span>
            </label>
            <p-multiselect
              [(ngModel)]="selectedClients"
              [options]="clients()"
              optionLabel="name"
              optionValue="id"
              placeholder="Choose clients..."
              [filter]="true"
              filterBy="name,email"
              [showToggleAll]="true"
              [showHeader]="true"
              appendTo="body"
              class="w-full"
              [loading]="loadingClients()"
              [disabled]="loadingClients()"
            >
              <ng-template #selectedItems let-value>
                <div class="flex flex-wrap gap-1">
                  @for (clientId of value; track clientId) {
                    @if (getClientById(clientId); as client) {
                      <div class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {{ client.name }}
                      </div>
                    }
                  }
                </div>
              </ng-template>

              <ng-template #item let-client>
                <div class="flex items-center justify-between w-full">
                  <div class="flex-1">
                    <div class="font-medium">{{ client.name }}</div>
                    <div class="text-sm text-gray-500">{{ client.email }}</div>
                  </div>
                  <div class="text-xs text-gray-400">ID: {{ client.id }}</div>
                </div>
              </ng-template>
            </p-multiselect>

            @if (selectedClients && selectedClients.length > 0) {
              <div class="mt-2 text-sm text-gray-600">{{ selectedClients.length }} client(s) selected</div>
            }
          </div>
        </div>

        <ng-template #footer>
          <div class="flex justify-end gap-2 mt-4">
            <p-button label="Cancel" severity="secondary" (onClick)="hideDialog()" />
            <p-button label="Create Plans" (onClick)="createPlans()" [loading]="creating()" [disabled]="!selectedClients || selectedClients.length === 0" />
          </div>
        </ng-template>
      }
    </p-dialog>

    <p-toast />
  `
})
export class MealPlanTemplatesComponent implements OnInit {
  templates = signal<MealPlanTemplate[]>([]);
  clients = signal<Client[]>([]);
  loading = signal(false);
  loadingClients = signal(false);
  creating = signal(false);
  creatingTemplate = signal(false);

  // Skeleton items for loading state
  skeletonItems = Array(6).fill({}); // Show 6 skeleton cards

  // Create meal plan dialog
  showDialog = false;
  selectedTemplate: MealPlanTemplate | null = null;
  newPlanName = '';
  startDate: Date | null = null;
  selectedClients: number[] = [];

  // Create template dialog
  showCreateTemplateDialog = false;
  newTemplate: Partial<MealPlanTemplate> = {};
  macroPercentageError = false;

  // Dropdown options
  planTypeOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-weekly', value: 'biweekly' }
  ];

  audienceOptions = [
    { label: 'Weight Loss', value: 'weight_loss' },
    { label: 'Muscle Gain', value: 'muscle_gain' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Keto', value: 'keto' },
    { label: 'Vegetarian', value: 'vegetarian' }
  ];

  constructor(
    private templateService: MealPlanTemplateService,
    private clientService: ClientService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTemplates();
    this.loadClients();
  }

  async loadTemplates() {
    this.loading.set(true);
    try {
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

  async loadClients() {
    this.loadingClients.set(true);
    try {
      const { data, error } = await this.clientService.getClients();
      if (error) {
        throw error;
      }
      this.clients.set(data || []);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load clients'
      });
    } finally {
      this.loadingClients.set(false);
    }
  }

  getClientById(id: number): Client | undefined {
    return this.clients().find((client) => client.id === id);
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
    this.selectedClients = [];
    this.showDialog = true;
  }

  hideDialog() {
    this.showDialog = false;
    this.selectedTemplate = null;
    this.newPlanName = '';
    this.startDate = null;
    this.selectedClients = [];
  }

  async createPlans() {
    if (!this.selectedTemplate || !this.startDate || !this.selectedClients || this.selectedClients.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill in all required fields and select at least one client'
      });
      return;
    }

    this.creating.set(true);

    try {
      const promises = this.selectedClients.map(async (clientId) => {
        const client = this.getClientById(clientId);
        const planName = this.selectedClients.length === 1 ? this.newPlanName : `${this.newPlanName} - ${client?.name}`;

        return this.templateService.createMealPlanFromTemplate(this.selectedTemplate!.id!, clientId, this.startDate!.toISOString().split('T')[0], planName);
      });

      const results = await Promise.allSettled(promises);

      const successful = results.filter((result) => result.status === 'fulfilled').length;
      const failed = results.filter((result) => result.status === 'rejected').length;

      if (successful > 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${successful} meal plan(s) created successfully!${failed > 0 ? ` ${failed} failed.` : ''}`
        });
      }

      if (failed > 0 && successful === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create meal plans'
        });
      }

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

  openCreateTemplateDialog() {
    this.newTemplate = {
      name: '',
      description: '',
      plan_type: 'weekly',
      target_audience: '',
      daily_calories: 2000,
      protein_percentage: 30,
      carbs_percentage: 40,
      fat_percentage: 30,
      is_public: true
    };
    this.macroPercentageError = false;
    this.showCreateTemplateDialog = true;
  }

  hideCreateTemplateDialog() {
    this.showCreateTemplateDialog = false;
    this.newTemplate = {};
    this.macroPercentageError = false;
  }

  isTemplateFormValid(): boolean {
    if (!this.newTemplate.name || !this.newTemplate.plan_type || !this.newTemplate.target_audience) {
      return false;
    }

    // Check if macro percentages add up to 100% if any are provided
    const protein = this.newTemplate.protein_percentage || 0;
    const carbs = this.newTemplate.carbs_percentage || 0;
    const fat = this.newTemplate.fat_percentage || 0;

    if (protein > 0 || carbs > 0 || fat > 0) {
      const total = protein + carbs + fat;
      this.macroPercentageError = Math.abs(total - 100) > 1; // Allow 1% tolerance
      return !this.macroPercentageError;
    }

    return true;
  }

  async createTemplate() {
    if (!this.isTemplateFormValid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill in all required fields correctly'
      });
      return;
    }

    this.creatingTemplate.set(true);

    try {
      const result = await this.templateService.createTemplate(this.newTemplate as MealPlanTemplate);

      if (result.error) {
        throw result.error;
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Template created successfully!'
      });

      this.hideCreateTemplateDialog();
      this.loadTemplates(); // Refresh the templates list
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create template'
      });
    } finally {
      this.creatingTemplate.set(false);
    }
  }

  async deleteTemplate(template: MealPlanTemplate) {
    try {
      const result = await this.templateService.deleteTemplate(template);

      if (result.error) {
        throw result.error;
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Template deleted!'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete template'
      });
    } finally {
      this.loadTemplates(); // Refresh the templates list
    }
  }
}
