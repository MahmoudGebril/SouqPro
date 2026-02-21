import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'inventory', loadComponent: () => import('./features/inventory/inventory.component').then(m => m.InventoryComponent) },
      { path: 'sales', loadComponent: () => import('./features/sales/sales.component').then(m => m.SalesComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
