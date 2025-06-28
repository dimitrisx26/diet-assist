import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../layout/component/app.demolayout').then((m) => m.DemoLayoutComponent),
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'button', loadComponent: () => import('../pages/uikit/buttondemo').then((m) => m.ButtonDemo) },
      { path: 'charts', loadComponent: () => import('../pages/uikit/chartdemo').then((m) => m.ChartDemo) },
      { path: 'file', loadComponent: () => import('../pages/uikit/filedemo').then((m) => m.FileDemo) },
      { path: 'formlayout', loadComponent: () => import('../pages/uikit/formlayoutdemo').then((m) => m.FormLayoutDemo) },
      { path: 'input', loadComponent: () => import('../pages/uikit/inputdemo').then((m) => m.InputDemo) },
      { path: 'list', loadComponent: () => import('../pages/uikit/listdemo').then((m) => m.ListDemo) },
      { path: 'media', loadComponent: () => import('../pages/uikit/mediademo').then((m) => m.MediaDemo) },
      { path: 'message', loadComponent: () => import('../pages/uikit/messagesdemo').then((m) => m.MessagesDemo) },
      { path: 'misc', loadComponent: () => import('../pages/uikit/miscdemo').then((m) => m.MiscDemo) },
      { path: 'panel', loadComponent: () => import('../pages/uikit/panelsdemo').then((m) => m.PanelsDemo) },
      { path: 'timeline', loadComponent: () => import('../pages/uikit/timelinedemo').then((m) => m.TimelineDemo) },
      { path: 'table', loadComponent: () => import('../pages/uikit/tabledemo').then((m) => m.TableDemo) },
      { path: 'overlay', loadComponent: () => import('../pages/uikit/overlaydemo').then((m) => m.OverlayDemo) },
      { path: 'tree', loadComponent: () => import('../pages/uikit/treedemo').then((m) => m.TreeDemo) },
      { path: 'menu', loadComponent: () => import('../pages/uikit/menudemo').then((m) => m.MenuDemo) }
    ]
  }
] as Routes;
