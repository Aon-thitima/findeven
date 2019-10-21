import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatsPage } from './chats.page';
import { MomentPipe } from 'src/app/_shared/pipes/moment.pipe';

const routes: Routes = [
  {
    path: '',
    component: ChatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatsPage, MomentPipe]
})
export class ChatsPageModule {}