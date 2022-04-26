import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'module.home.moduleName', translate: true
    },
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Incio'
        }
      },
      {
        path: 'venta',
        component: VentaComponent,
        data: {
          title: 'module.venta.moduleName', translate: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
