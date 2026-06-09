import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'game',
    title: 'Game',
    loadComponent: () => import('./game/game').then((m) => m.Game),
  },
  {
    path: 'rules',
    title: 'Rules',
    loadComponent: () => import('./rules/rules').then((m) => m.Rules),
  },
  {
    path: 'settings',
    title: 'Settings',
    loadComponent: () => import('./settings/settings').then((m) => m.Settings),
  },
  {
    path: 'impressum',
    title: 'Impressum',
    loadComponent: () => import('./impressum/impressum').then((m) => m.Impressum),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./page-not-found/page-not-found').then((m) => m.PageNotFound),
  },
];
