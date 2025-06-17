import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-demo-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, PanelModule, MenuModule, TagModule, MenubarModule],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="flex items-center gap-2 mb-4">
                    <p-tag severity="info" value="Development Only" icon="pi pi-info-circle"></p-tag>
                    <span class="text-sm text-surface-600">This section is only available in development mode</span>
                </div>
            </div>
            <div class="col-12 mb-4">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">UI Components Demo</div>
                    <p-menubar [model]="demoMenuItems" styleClass="border-none p-0">
                        <ng-template pTemplate="start">
                            <i class="pi pi-code text-primary mr-2"></i>
                        </ng-template>
                    </p-menubar>
                </div>
            </div>
            <div class="col-12">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class DemoLayoutComponent {
    demoMenuItems = [
        {
            label: 'Form Components',
            icon: 'pi pi-fw pi-pencil',
            items: [
                { label: 'Buttons', icon: 'pi pi-fw pi-circle', routerLink: ['/demo/button'] },
                { label: 'Input Fields', icon: 'pi pi-fw pi-pencil', routerLink: ['/demo/input'] },
                { label: 'Form Layout', icon: 'pi pi-fw pi-tablet', routerLink: ['/demo/formlayout'] }
            ]
        },
        {
            label: 'Data Display',
            icon: 'pi pi-fw pi-table',
            items: [
                { label: 'Tables', icon: 'pi pi-fw pi-table', routerLink: ['/demo/table'] },
                { label: 'Lists', icon: 'pi pi-fw pi-list', routerLink: ['/demo/list'] },
                { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/demo/charts'] }
            ]
        },
        {
            label: 'Navigation',
            icon: 'pi pi-fw pi-bars',
            items: [
                { label: 'Menus', icon: 'pi pi-fw pi-bars', routerLink: ['/demo/menu'] },
                { label: 'Panels', icon: 'pi pi-fw pi-clone', routerLink: ['/demo/panel'] }
            ]
        },
        {
            label: 'Overlays',
            icon: 'pi pi-fw pi-window-maximize',
            items: [
                { label: 'Dialogs & Overlays', icon: 'pi pi-fw pi-window-maximize', routerLink: ['/demo/overlay'] }
            ]
        },
        {
            label: 'Media & Misc',
            icon: 'pi pi-fw pi-image',
            items: [
                { label: 'Media Components', icon: 'pi pi-fw pi-image', routerLink: ['/demo/media'] },
                { label: 'File Upload', icon: 'pi pi-fw pi-upload', routerLink: ['/demo/file'] },
                { label: 'Messages', icon: 'pi pi-fw pi-comment', routerLink: ['/demo/message'] },
                { label: 'Timeline', icon: 'pi pi-fw pi-clock', routerLink: ['/demo/timeline'] },
                { label: 'Tree', icon: 'pi pi-fw pi-sitemap', routerLink: ['/demo/tree'] },
                { label: 'Miscellaneous', icon: 'pi pi-fw pi-circle', routerLink: ['/demo/misc'] }
            ]
        }
    ];
}