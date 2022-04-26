import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './services/guard.service';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';

// Import Containers
import { HomeLayoutComponent } from './containers';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/home',
    pathMatch: 'full',
  },
  {
    path: 'administration',
    redirectTo: 'administration/user',
    pathMatch: 'full',
  },
  {
    path: 'state',
    redirectTo: 'home/home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: HomeLayoutComponent,
    /*data: {
      title: 'CargoApps'
    },*/
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
      },
    ]
  },
  
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
