import { MomentPipe } from 'src/app/_shared/pipes/moment.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivitysPage } from './activitys.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitysPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivitysPage, MomentPipe]
})
export class ActivitysPageModule {}
