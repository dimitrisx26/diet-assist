import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, SkeletonModule, CardModule, TagModule, DividerModule, ButtonModule, ChipModule, DialogModule, InputTextModule, TextareaModule, FormsModule, ToastModule],
  template: `
    <div class="max-w-screen-2xl mx-auto">
      <!-- Header Section -->
      <div class="mb-6 lg:mb-8">
        <p-card styleClass="border-none shadow-md">
          <div class="flex flex-column lg:flex-row lg lg:justify-content-between gap-4">
            <div class="flex-1">
              @if (loading.user) {
                <p-skeleton width="250px" height="2.5rem" styleClass="mb-3" />
                <p-skeleton width="180px" height="1rem" />
              } @else {
                <h1 class="text-2xl lg:text-3xl xl:text-4xl font-bold m-0 mb-2 text-surface-900 dark:text-surface-0">{{ user?.name }}</h1>
                <p class="text-surface-500 dark:text-surface-400 m-0 text-base lg:text-lg">Client ID: {{ user?.id }}</p>
              }
            </div>
            @if (loading.user) {
              <p-skeleton width="80px" height="2rem" />
            } @else if (user?.gender) {
              <p-tag [style]="{ width: '7rem', height: '2rem' }" [value]="user?.gender!.toUpperCase()" [severity]="getSeverity(user?.gender!)" />
            }
          </div>
        </p-card>
      </div>

      <!-- Main Content Grid -->
      <div class="grid gap-6 lg:gap-8">
        <!-- Contact & Personal Info -->
        <div class="col-12 lg:col-6 2xl:col-4">
          <p-card styleClass="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
            <ng-template #header>
              <div class="flex flex-row gap-3 px-4 pt-4 pb-3 lg:px-6 lg:pt-6">
                <i class="pi pi-user text-primary self-center"></i>
                <h3 class="text-xl lg:text-2xl font-bold m-0 flex text-surface-900 dark:text-surface-0">Personal Information</h3>
              </div>
            </ng-template>

            <div class="space-y-4">
              <!-- Contact Info -->
              <div>
                <h6 class="text-primary mb-3 font-bold text-base flex gap-2">
                  <i class="pi pi-at text-primary self-center"></i>
                  Contact Details
                </h6>
                <div class="space-y-3">
                  <div class="flex gap-3 p-3 bg-surface-50 dark:bg-surface-800 border-round-lg">
                    <i class="pi pi-envelope text-primary text-lg self-center"></i>
                    <div class="flex-1">
                      @if (loading.user) {
                        <p-skeleton width="160px" height="1rem" />
                      } @else {
                        <div class="font-semibold text-surface-900 dark:text-surface-0">{{ user?.email || 'Not provided' }}</div>
                        <small class="text-surface-500 dark:text-surface-400">Email Address</small>
                      }
                    </div>
                  </div>

                  <div class="flex gap-3 p-3 bg-surface-50 dark:bg-surface-800 border-round-lg">
                    <i class="pi pi-phone text-primary text-lg self-center"></i>
                    <div class="flex-1">
                      @if (loading.user) {
                        <p-skeleton width="120px" height="1rem" />
                      } @else {
                        <div class="font-semibold text-surface-900 dark:text-surface-0">{{ user?.phone || 'Not provided' }}</div>
                        <small class="text-surface-500 dark:text-surface-400">Phone Number</small>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <p-divider styleClass="my-4" />

              <!-- Basic Info -->
              <div>
                <h6 class="text-primary mb-3 font-bold text-base flex gap-2">
                  <i class="pi pi-info-circle text-primary self-center"></i>
                  Basic Information
                </h6>
                <div class="grid gap-3">
                  <div class="col-6">
                    <div class="text-center p-4 bg-surface-100 dark:bg-surface-700 border-round-lg">
                      @if (loading.user) {
                        <p-skeleton width="40px" height="1.5rem" styleClass="mx-auto mb-2" />
                        <p-skeleton width="60px" height="0.875rem" styleClass="mx-auto" />
                      } @else {
                        <div class="text-2xl lg:text-3xl font-bold text-primary mb-1">{{ user?.age || '-' }}</div>
                        <small class="text-surface-600 dark:text-surface-300 font-medium">Years Old</small>
                      }
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="text-center p-4 bg-surface-100 dark:bg-surface-700 border-round-lg">
                      @if (loading.user) {
                        <p-skeleton width="60px" height="1rem" styleClass="mx-auto" />
                      } @else {
                        <div class="font-bold text-primary capitalize text-lg mb-1">{{ user?.gender || 'Not specified' }}</div>
                        <small class="text-surface-600 dark:text-surface-300 font-medium">Gender</small>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </p-card>
        </div>

        <!-- Physical Stats -->
        <div class="col-12 lg:col-6 2xl:col-4">
          <p-card styleClass="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
            <ng-template #header>
              <div class="px-4 pt-4 pb-3 lg:px-6 lg:pt-6">
                <h3 class="text-xl lg:text-2xl font-bold m-0 flex gap-3 text-surface-900 dark:text-surface-0">
                  <i class="pi pi-chart-line text-green-600 dark:text-green-400 text-xl self-center"></i>
                  Physical Stats
                </h3>
              </div>
            </ng-template>

            <div class="space-y-4">
              <!-- Height & Weight -->
              <div class="grid gap-3">
                <div class="col-6">
                  <div class="text-center p-4 border-2 border-dashed border-surface-300 dark:border-surface-600 border-round-lg hover:border-primary transition-colors duration-200">
                    @if (loading.user) {
                      <p-skeleton width="60px" height="1.5rem" styleClass="mx-auto mb-2" />
                      <p-skeleton width="40px" height="0.875rem" styleClass="mx-auto" />
                    } @else {
                      <div class="text-xl lg:text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">{{ user?.height || '-' }}</div>
                      <small class="text-surface-500 dark:text-surface-400 font-medium">Height (cm)</small>
                    }
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-4 border-2 border-dashed border-surface-300 dark:border-surface-600 border-round-lg hover:border-primary transition-colors duration-200">
                    @if (loading.user) {
                      <p-skeleton width="60px" height="1.5rem" styleClass="mx-auto mb-2" />
                      <p-skeleton width="40px" height="0.875rem" styleClass="mx-auto" />
                    } @else {
                      <div class="text-xl lg:text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">{{ user?.weight || '-' }}</div>
                      <small class="text-surface-500 dark:text-surface-400 font-medium">Weight (kg)</small>
                    }
                  </div>
                </div>
              </div>

              <!-- BMI & BMR -->
              @if (!loading.user && user?.height && user?.weight) {
                <div class="grid gap-3">
                  <div class="col-6">
                    <div class="text-center p-4 bg-surface-100 dark:bg-surface-700 border-round-lg">
                      <div class="text-xl lg:text-2xl font-bold text-primary mb-1">{{ getBMI() }}</div>
                      <div class="text-xs text-surface-600 dark:text-surface-300 font-semibold mb-1">{{ getBMICategory() }}</div>
                      <small class="text-surface-600 dark:text-surface-300 font-medium">BMI</small>
                    </div>
                  </div>
                  @if (user?.age && user?.gender) {
                    <div class="col-6">
                      <div class="text-center p-4 bg-surface-100 dark:bg-surface-700 border-round-lg">
                        <div class="text-xl lg:text-2xl font-bold text-primary mb-1">{{ getBMR() }}</div>
                        <small class="text-surface-600 dark:text-surface-300 font-medium">BMR (cal/day)</small>
                      </div>
                    </div>
                  }
                </div>
              } @else if (loading.user) {
                <div class="grid gap-3">
                  <div class="col-6">
                    <p-skeleton width="100%" height="4rem" />
                  </div>
                  <div class="col-6">
                    <p-skeleton width="100%" height="4rem" />
                  </div>
                </div>
              }

              <!-- Activity & Calories -->
              <div class="space-y-3">
                <div>
                  <h6 class="font-bold mb-2 text-base flex gap-2 text-surface-900 dark:text-surface-0">
                    <i class="pi pi-bolt text-orange-500 dark:text-orange-400 self-center"></i>
                    Activity Level
                  </h6>
                  @if (loading.user) {
                    <p-skeleton width="120px" height="1.75rem" />
                  } @else {
                    <p-tag [value]="formatActivityLevel(user?.activity_level)" [severity]="getActivitySeverity(user?.activity_level)" styleClass="text-sm font-semibold px-3 py-2" />
                  }
                </div>

                @if (!loading.user && user?.activity_level && getBMR() > 0) {
                  <div class="p-4 bg-surface-100 dark:bg-surface-700 border-round-lg text-center">
                    <div class="text-xl lg:text-2xl font-bold text-primary mb-1">{{ getDailyCalories() }}</div>
                    <small class="text-surface-600 dark:text-surface-300 font-medium">Daily Calories</small>
                  </div>
                } @else if (loading.user) {
                  <p-skeleton width="100%" height="3rem" />
                }
              </div>
            </div>
          </p-card>
        </div>

        <!-- Health Information -->
        <div class="col-12 2xl:col-4">
          <p-card styleClass="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
            <ng-template #header>
              <div class="px-4 pt-4 pb-3 lg:px-6 lg:pt-6">
                <h3 class="text-xl lg:text-2xl font-bold m-0 flex gap-3 text-surface-900 dark:text-surface-0">
                  <i class="pi pi-heart text-red-500 dark:text-red-400 text-xl self-center"></i>
                  Health Information
                </h3>
              </div>
            </ng-template>

            <div class="space-y-4">
              <!-- Medical Conditions -->
              <div>
                <h6 class="font-bold mb-3 text-base flex gap-2">
                  <i class="pi pi-exclamation-triangle text-orange-500 dark:text-orange-400 self-center"></i>
                  Medical Conditions
                </h6>
                @if (loading.user) {
                  <div class="flex gap-2">
                    <p-skeleton width="70px" height="1.75rem" />
                    <p-skeleton width="90px" height="1.75rem" />
                  </div>
                } @else {
                  @if (user?.medical_conditions && (user?.medical_conditions)!.length > 0) {
                    <div class="flex flex-wrap gap-2">
                      @for (condition of user?.medical_conditions; track condition) {
                        <p-chip [label]="condition" styleClass="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium px-3 py-2" />
                      }
                    </div>
                  } @else {
                    <div class="text-center py-4 bg-surface-50 dark:bg-surface-800 border-round-lg">
                      <i class="pi pi-check-circle text-green-400 text-2xl mb-2 self-center"></i>
                      <p class="text-surface-600 dark:text-surface-300 m-0 text-sm font-medium">No medical conditions reported</p>
                    </div>
                  }
                }
              </div>

              <!-- Allergies -->
              <div>
                <h6 class="font-bold mb-3 text-base flex gap-2">
                  <i class="pi pi-times-circle text-red-500 dark:text-red-400 self-center"></i>
                  Allergies
                </h6>
                @if (loading.user) {
                  <div class="flex gap-2">
                    <p-skeleton width="60px" height="1.75rem" />
                    <p-skeleton width="80px" height="1.75rem" />
                  </div>
                } @else {
                  @if (user?.allergies && (user?.allergies)!.length > 0) {
                    <div class="flex flex-wrap gap-2">
                      @for (allergy of user?.allergies; track allergy) {
                        <p-chip [label]="allergy" styleClass="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium px-3 py-2" />
                      }
                    </div>
                  } @else {
                    <div class="text-center py-4 bg-surface-50 dark:bg-surface-800 border-round-lg">
                      <i class="pi pi-check-circle text-green-400 text-2xl mb-2 self-center"></i>
                      <p class="text-surface-600 dark:text-surface-300 m-0 text-sm font-medium">No allergies reported</p>
                    </div>
                  }
                }
              </div>

              <!-- Dietary Preferences -->
              <div>
                <h6 class="font-bold mb-3 text-base flex gap-2">
                  <i class="pi pi-heart-fill text-green-500 dark:text-green-400 self-center"></i>
                  Dietary Preferences
                </h6>
                @if (loading.user) {
                  <div class="flex gap-2">
                    <p-skeleton width="80px" height="1.75rem" />
                    <p-skeleton width="70px" height="1.75rem" />
                  </div>
                } @else {
                  @if (user?.dietary_preferences && (user?.dietary_preferences)!.length > 0) {
                    <div class="flex flex-wrap gap-2">
                      @for (preference of user?.dietary_preferences; track preference) {
                        <p-chip [label]="preference" styleClass="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-2" />
                      }
                    </div>
                  } @else {
                    <div class="text-center py-4 bg-surface-50 dark:bg-surface-800 border-round-lg">
                      <i class="pi pi-info-circle text-blue-400 text-2xl mb-2 self-center"></i>
                      <p class="text-surface-600 dark:text-surface-300 m-0 text-sm font-medium">No dietary preferences specified</p>
                    </div>
                  }
                }
              </div>
            </div>
          </p-card>
        </div>

        <!-- Goals -->
        <div class="col-12">
          <p-card styleClass="border-none shadow-md hover:shadow-lg transition-all duration-300">
            <ng-template #header>
              <div class="px-4 pt-4 pb-3 lg:px-6 lg:pt-6 flex items-center justify-between">
                <h3 class="text-xl lg:text-2xl font-bold m-0 flex gap-3 text-surface-900 dark:text-surface-0">
                  <i class="pi pi-flag text-indigo-600 dark:text-indigo-400 text-xl self-center"></i>
                  Goals & Objectives
                </h3>
                <div class="flex items-center">
                  @if (!loading.user && user) {
                    <p-button icon="pi pi-pencil" severity="info" [outlined]="true" (click)="editGoals()" pTooltip="Edit Goals" label="" />
                  }
                </div>
              </div>
            </ng-template>

            @if (loading.user) {
              <div class="flex gap-3">
                <p-skeleton width="120px" height="2.5rem" />
                <p-skeleton width="100px" height="2.5rem" />
                <p-skeleton width="140px" height="2.5rem" />
              </div>
            } @else {
              @if (user?.goals && (user?.goals)!.length > 0) {
                <div class="flex flex-wrap gap-3">
                  @for (goal of user?.goals; track goal) {
                    <p-tag [value]="goal" severity="success" styleClass="text-base font-semibold px-4 py-3" />
                  }
                </div>
              } @else {
                <div class="text-center py-8">
                  <div class="flex justify-content-center w-4rem h-4rem mx-auto mb-4">
                    <i class="pi pi-flag text-4xl text-surface-400 self-center"></i>
                  </div>
                  <h5 class="text-surface-700 dark:text-surface-200 m-0 mb-2">No Goals Set</h5>
                  <p class="text-surface-500 dark:text-surface-400 m-0">Goals and objectives will appear here once they are defined.</p>
                </div>
              }
            }
          </p-card>
        </div>

        <!-- Notes -->
        <div class="col-12">
          <p-card styleClass="border-none shadow-md">
            <ng-template #header>
              <div class="px-4 pt-4 pb-3 lg:px-6 lg:pt-6 flex items-center justify-between">
                <h3 class="text-xl lg:text-2xl font-bold m-0 flex gap-3 text-surface-900 dark:text-surface-0">
                  <i class="pi pi-file-edit text-yellow-600 dark:text-yellow-400 text-xl self-center"></i>
                  Notes
                </h3>
                <div class="flex items-center">
                  @if (loading.user) {
                    <div class="flex gap-3">
                      <p-skeleton width="120px" height="2.5rem" />
                      <p-skeleton width="100px" height="2.5rem" />
                      <p-skeleton width="140px" height="2.5rem" />
                    </div>
                  }
                  @if (!loading.user && user) {
                    <p-button icon="pi pi-pencil" severity="info" [outlined]="true" (click)="editNotes()" pTooltip="Edit Goals" label="" />
                  }
                </div>
              </div>
            </ng-template>

            <div class="bg-surface-50 dark:bg-surface-800 p-4 lg:p-6 border-round-lg">
              <p class="text-surface-700 dark:text-surface-200 line-height-3 m-0 text-base lg:text-lg">{{ user?.notes }}</p>
            </div>
          </p-card>
        </div>

        <!-- Metadata -->
        <div class="col-12">
          <p-card styleClass="border-none shadow-sm bg-surface-50 dark:bg-surface-800">
            <div class="flex flex-column lg:flex-row justify-content-between align-items-start lg gap-3">
              @if (loading.user) {
                <p-skeleton width="200px" height="1rem" />
                <p-skeleton width="200px" height="1rem" />
              } @else {
                <div class="flex gap-2 text-surface-500 dark:text-surface-400 mr-4">
                  <i class="pi pi-calendar-plus text-base self-center"></i>
                  <span class="text-sm lg:text-base">Created: {{ user?.created_at | date: 'medium' }}</span>
                </div>
                <div class="flex gap-3 text-surface-500 dark:text-surface-400">
                  <i class="pi pi-calendar-times text-base self-center"></i>
                  <span class="text-sm lg:text-base">Last Updated: {{ user?.updated_at | date: 'medium' }}</span>
                </div>
              }
            </div>
          </p-card>
        </div>
      </div>
    </div>

    <!-- Goals and Notes Edit Dialog -->
    <p-dialog [(visible)]="goalsAndNotesDialog" [style]="{ width: '650px' }" [header]="goalsDialog ? 'Manage Goals' : 'Manage Notes'" [modal]="true" styleClass="p-fluid">
      <ng-template #content>
        @if (goalsDialog) {
          <div class="space-y-6">
            <!-- Goals Section -->
            <div>
              <label class="font-semibold text-lg mb-3 flex items-center gap-2">
                <i class="pi pi-flag text-indigo-600"></i>
                Goals & Objectives
              </label>

              <!-- Add Goal Input -->
              <div class="flex gap-2 mb-3">
                <input pInputText [(ngModel)]="newGoal" placeholder="Add a new goal..." class="flex-1" (keyup.enter)="addGoal()" />
                <p-button icon="pi pi-plus" (onClick)="addGoal()" [disabled]="!newGoal.trim()" />
              </div>

              <!-- Goals List -->
              <div class="space-y-2">
                @if (editingClient.goals && editingClient.goals.length > 0) {
                  @for (goal of editingClient.goals; track goal; let i = $index) {
                    <div class="flex items-center gap-2 p-3 border border-surface-200 dark:border-surface-700 border-round">
                      <i class="pi pi-check-circle text-green-500"></i>
                      <span class="flex-1">{{ goal }}</span>
                      <p-button icon="pi pi-times" severity="danger" [rounded]="true" [text]="true" size="small" (onClick)="removeGoal(i)" />
                    </div>
                  }
                } @else {
                  <div class="text-center py-4 text-surface-500">
                    <i class="pi pi-info-circle text-2xl mb-2 block"></i>
                    No goals set yet
                  </div>
                }
              </div>
            </div>
          </div>
        }

        @if (notesDialog) {
          <div class="space-y-6">
            <!-- Notes Section -->
            <div>
              <label class="font-semibold text-lg mb-3 flex items-center gap-2">
                <i class="pi pi-file-edit text-yellow-600"></i>
                Notes
              </label>
              <textarea pTextarea [(ngModel)]="editingClient.notes" rows="6" placeholder="Add notes..." class="w-full"></textarea>
            </div>
          </div>
        }
      </ng-template>

      <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" [text]="true" (onClick)="hideDialog()" />
        <p-button label="Save" icon="pi pi-check" (onClick)="saveGoalsAndNotes()" [loading]="saving" />
      </ng-template>
    </p-dialog>

    <p-toast />
  `,
  styles: [
    `
      .space-y-4 > * + * {
        margin-top: 1rem;
      }
      .space-y-3 > * + * {
        margin-top: 0.75rem;
      }

      :host ::ng-deep {
        .p-card {
          background: var(--surface-card);
          overflow: hidden;
        }

        .p-card-body {
          padding: 1.5rem;
        }

        .p-card-header {
          padding: 0;
        }

        .p-chip {
          border-radius: 0.75rem;
        }

        .p-divider {
          margin: 1rem 0;
        }

        .border-round-lg {
          border-radius: 0.75rem;
        }

        /* Enhanced shadows */
        .shadow-md {
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .shadow-lg {
          box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .shadow-sm {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        /* Responsive design improvements */
        @media (min-width: 1024px) {
          .p-card-body {
            padding: 2rem;
          }

          .grid {
            gap: 2rem;
          }
        }

        @media (min-width: 1536px) {
          .grid {
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .p-card-body {
            padding: 1rem;
          }
        }
      }
    `
  ],
  providers: [MessageService]
})
export class UserDetailsComponent implements OnInit {
  editingClient!: Client;
  goalsAndNotesDialog: boolean = false;
  goalsDialog: boolean = false;
  notesDialog: boolean = false;
  loading = {
    user: false
  };
  newGoal: string = '';
  saving: boolean = false;
  user: Client | null = null;
  userID: string | null;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.['client'];
    this.userID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (!this.user && this.userID) {
      this.loading.user = true;
      this.clientService
        .getClientById(this.userID)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading.user = false;
        });
    }
  }

  addGoal() {
    if (this.newGoal?.trim()) {
      if (!this.editingClient.goals) {
        this.editingClient.goals = [];
      }
      this.editingClient.goals.push(this.newGoal.trim());
      this.newGoal = '';
    }
  }

  editGoals() {
    if (!this.user) return;

    this.editingClient = {
      ...this.user,
      goals: [...(this.user.goals || [])]
    };

    this.newGoal = '';
    this.goalsAndNotesDialog = true;
    this.goalsDialog = true;
  }

  editNotes() {
    if (!this.user) return;

    this.editingClient = {
      ...this.user,
      notes: this.user.notes || ''
    };

    this.goalsAndNotesDialog = true;
    this.notesDialog = true;
  }

  formatActivityLevel(level?: string): string {
    if (!level) return 'Not specified';
    return level.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  getActivitySeverity(level?: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null {
    switch (level) {
      case 'sedentary':
        return 'danger';
      case 'lightly_active':
        return 'warning';
      case 'moderately_active':
        return 'info';
      case 'very_active':
        return 'success';
      case 'super_active':
        return 'success';
      default:
        return 'secondary';
    }
  }

  getBMI(): string {
    if (!this.user?.height || !this.user?.weight) return 'N/A';
    const bmi = this.clientService.calculateBMI(this.user.height, this.user.weight);
    return bmi.toFixed(1);
  }

  getBMICategory(): string {
    if (!this.user?.height || !this.user?.weight) return '';
    const bmi = this.clientService.calculateBMI(this.user.height, this.user.weight);
    return this.clientService.getBMICategory(bmi);
  }

  getBMR(): number {
    if (!this.user?.weight || !this.user?.height || !this.user?.age || !this.user?.gender) return 0;
    return Math.round(this.clientService.calculateBMR(this.user.weight, this.user.height, this.user.age, this.user.gender));
  }

  getDailyCalories(): number {
    if (!this.user?.activity_level) return 0;
    const bmr = this.getBMR();
    if (bmr === 0) return 0;
    return Math.round(this.clientService.calculateDailyCalories(bmr, this.user.activity_level));
  }

  getSeverity(gender: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null {
    switch (gender) {
      case 'male':
        return 'info';
      case 'female':
        return 'danger';
      case 'other':
        return 'secondary';
      default:
        return 'warning';
    }
  }

  hideDialog() {
    this.goalsAndNotesDialog = false;
    this.goalsDialog = false;
    this.notesDialog = false;
    this.editingClient = { name: '', email: '' };
    this.newGoal = '';
    this.saving = false;
  }

  removeGoal(index: number) {
    if (this.editingClient.goals) {
      this.editingClient.goals.splice(index, 1);
    }
  }

  saveGoalsAndNotes() {
    if (!this.editingClient.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Cannot save: Invalid client ID',
        life: 3000
      });
      return;
    }

    this.saving = true;

    const updateData = {
      goals: this.editingClient.goals || [],
      notes: this.editingClient.notes || ''
    };

    this.clientService
      .updateClient(this.editingClient.id, updateData)
      .then((res) => {
        if (res.error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.error.message || 'Failed to update client',
            life: 3000
          });
        } else {
          // Update the local user object
          if (this.user) {
            this.user = {
              ...this.user,
              goals: updateData.goals,
              notes: updateData.notes
            };
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.goalsDialog ? 'Goals updated successfully' : 'Notes updated successfully',
            life: 3000
          });
          this.hideDialog();
        }
      })
      .catch((error) => {
        console.error('Error updating client:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update client',
          life: 3000
        });
      })
      .finally(() => {
        this.saving = false;
      });
  }
}
