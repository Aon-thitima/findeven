import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/(tabHome:tabHome)',
        pathMatch: 'full'
      },
      {
        path: 'tabHome',
        children: [
          {
            path: '',
            loadChildren: '../tab-home/tab-home.module#TabHomePageModule'
          }
        ]
      },
      {
        path: 'tabMenu',
        children: [
          {
            path: '',
            loadChildren: '../menu/menu.module#MenuPageModule'
          }
        ]
      },
      {
        path: 'tabNotification',
        children: [
          {
            path: '',
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: '../tab-activity/tab-activity.module#TabActivityPageModule'
          },
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/tabHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage],
  exports: [TabsPage]
})
export class TabsPageModule { }
