import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule
  ],
  template: `
    <p-toolbar styleClass="mb-6">
      <ng-template #start>
        <p-button severity="danger" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedClients()" [disabled]="!selectedClients || !selectedClients.length" />
      </ng-template>

      <ng-template #end>
        <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
      </ng-template>
    </p-toolbar>

    <p-table
      #dt
      [value]="clients()"
      [rows]="10"
      [columns]="cols"
      [paginator]="true"
      [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
      [tableStyle]="{ 'min-width': '75rem' }"
      [(selection)]="selectedClients"
      [rowHover]="true"
      dataKey="id"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clients"
      [showCurrentPageReport]="true"
      [rowsPerPageOptions]="[10, 20, 30]"
    >
      <ng-template #caption>
        <div class="flex items-center justify-between">
          <h5 class="m-0">Manage Clients</h5>
          <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
          </p-iconfield>
        </div>
      </ng-template>
      <ng-template #header>
        <tr>
          <th style="width: 3rem">
            <p-tableHeaderCheckbox />
          </th>
          <th pSortableColumn="id" style="min-width: 4rem">
            ID
            <p-sortIcon field="id" />
          </th>
          <th pSortableColumn="name" style="min-width:12rem">
            Name
            <p-sortIcon field="name" />
          </th>
          <th style="min-width:12rem">Email</th>
          <th style="min-width: 12rem">Phone</th>
          <th pSortableColumn="age" style="min-width:8rem">
            Age
            <p-sortIcon field="age" />
          </th>
          <th pSortableColumn="gender" style="min-width:8rem">
            Gender
            <p-sortIcon field="gender" />
          </th>
          <th></th>
        </tr>
      </ng-template>
      <ng-template #body let-client>
        <tr>
          <td style="width: 3rem">
            <p-tableCheckbox [value]="client" />
          </td>
          <td style="min-width: 4rem">{{ client.id }}</td>
          <td style="min-width: 12rem">{{ client.name }}</td>
          <td style="min-width: 12rem">{{ client.email }}</td>
          <td style="min-width: 12rem">{{ client.phone }}</td>
          <td style="min-width: 8rem">{{ client.age }}</td>
          <td style="min-width: 8rem">{{ client.gender }}</td>
          <td>
            <p-tag [value]="client.inventoryStatus" [severity]="getSeverity(client.inventoryStatus)" />
          </td>
          <td>
            <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteClient(client)" />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-confirmdialog [style]="{ width: '450px' }" />
  `,
  providers: [MessageService, ClientService, ConfirmationService]
})
export class UsersList implements OnInit {
  clients = signal<Client[]>([]);

  client!: Client;

  selectedClients!: Client[] | null;

  submitted: boolean = false;

  genders!: { label: string; value: 'male' | 'female' | 'other' }[];

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().then((res) => {
      this.clients.set(res.data || []);
    });

    this.genders = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ];

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'age', header: 'Age' },
      { field: 'gender', header: 'Gender' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteSelectedClients() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected clients?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients.set(this.clients().filter((val) => !this.selectedClients?.includes(val)));
        this.selectedClients = null;
        this.loadClients();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clients Deleted',
          life: 3000
        });
      }
    });
  }

  deleteClient(client: Client) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + (client.name || 'this client') + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (client.id) {
          this.clientService.deleteClient(client.id).then(() => {
            this.loadClients();
            this.client = { name: '', email: '' };
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Client Deleted',
              life: 3000
            });
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot delete client: Invalid ID',
            life: 3000
          });
        }
      }
    });
  }

  getSeverity(gender: string) {
    switch (gender) {
      case 'Male':
        return 'success';
      case 'Female':
        return 'danger';
      case 'Other':
        return 'secondary';
      default:
        return 'info';
    }
  }
}
