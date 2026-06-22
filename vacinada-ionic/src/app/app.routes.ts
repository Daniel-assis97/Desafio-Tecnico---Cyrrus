import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
      { path: 'vaccines', loadComponent: () => import('./pages/vaccines/vaccines.page').then((m) => m.VaccinesPage) },
      { path: 'campaigns', loadComponent: () => import('./pages/campaigns/campaigns.page').then((m) => m.CampaignsPage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'child/:id', loadComponent: () => import('./pages/child-detail/child-detail.page').then((m) => m.ChildDetailPage) },
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'tabs/home' },
];
