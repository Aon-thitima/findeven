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
        path: 'tabHome/homeDetail',
        loadChildren: '../home-detail/home-detail.module#HomeDetailPageModule'
      },
      {
        path: 'tabSettings',
        children: [
          {
            path: '',
            loadChildren: '../tab-settings/tab-settings.module#TabSettingsPageModule'
          }
        ]
      },
      {
        path: 'tabProfile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'tabActivity',
        children: [
          {
            path: '',
            loadChildren: '../tab-activity/tab-activity.module#TabActivityPageModule'
          },
        ]
      },
      {
        path: 'tabActivity/detail',
        loadChildren: '../activity-detail/activity-detail.module#ActivityDetailPageModule'
      },
      {
        path: 'tabActivity/:id',
        loadChildren: '../activity-detail/activity-detail.module#ActivityDetailPageModule'
      },
      {
        path: 'tabActivity/chat/:id',
        loadChildren: '../chats/chats.module#ChatsPageModule'
      }
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
  declarations: [TabsPage]
})
export class TabsPageModule { }