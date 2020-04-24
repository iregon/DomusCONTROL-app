import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boot',
    pathMatch: 'full'
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'room',
  //   loadChildren: () => import('./pages/room/room.module').then( m => m.RoomPageModule)
  // },
  {
    path: 'boot',
    loadChildren: () => import('./pages/boot/boot.module').then( m => m.BootPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

