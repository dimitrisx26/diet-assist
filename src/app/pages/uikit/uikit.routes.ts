import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FileDemo } from './filedemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { MessagesDemo } from './messagesdemo';
import { MiscDemo } from './miscdemo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { OverlayDemo } from './overlaydemo';
import { TreeDemo } from './treedemo';
import { MenuDemo } from './menudemo';
import { DemoLayoutComponent } from '../../layout/component/app.demolayout';

export default [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'button', component: ButtonDemo },
      { path: 'charts', component: ChartDemo },
      { path: 'file', component: FileDemo },
      { path: 'formlayout', component: FormLayoutDemo },
      { path: 'input', component: InputDemo },
      { path: 'list', component: ListDemo },
      { path: 'media', component: MediaDemo },
      { path: 'message', component: MessagesDemo },
      { path: 'misc', component: MiscDemo },
      { path: 'panel', component: PanelsDemo },
      { path: 'timeline', component: TimelineDemo },
      { path: 'table', component: TableDemo },
      { path: 'overlay', component: OverlayDemo },
      { path: 'tree', component: TreeDemo },
      { path: 'menu', component: MenuDemo }
    ]
  }
] as Routes;
