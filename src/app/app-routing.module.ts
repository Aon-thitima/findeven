import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { CheckUserReportGuard } from './core/guard/check-report-user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  {
    path: 'members',
    canActivate: [AuthenticationGuard, CheckUserReportGuard],
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'popover', loadChildren: './pages/popover/popover.module#PopoverPageModule' },
  { path: 'activitys/:id', loadChildren: './pages/activitys/activitys.module#ActivitysPageModule' },
  {
    path: 'activity/:id',
    loadChildren: './pages/activity-detail/activity-detail.module#ActivityDetailPageModule'
  },
  {
    path: 'chat/:id',
    loadChildren: './pages/chats/chats.module#ChatsPageModule'
  },
  {
    path: 'activity-create/:groupID',
    loadChildren: './pages/activity-detail/activity-detail.module#ActivityDetailPageModule'
  },
  {
    path: 'activity-read-more/:id',
    loadChildren: './pages/activity-read-more/activity-read-more.module#ActivityReadMorePageModule'
  },
  {
    path: 'profile/:id',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'profile/:id/:activityID',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'report-list', loadChildren: './pages/report-list/report-list.module#ReportListPageModule' },
  { path: 'report-detail/:id', loadChildren: './pages/report-detail/report-detail.module#ReportDetailPageModule' },
  { path: 'page-report', loadChildren: './pages/page-report/page-report.module#PageReportPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
