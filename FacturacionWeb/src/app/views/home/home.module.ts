import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UIModule } from '../../ui.module';
import { CommonModule } from '@angular/common';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { VentaComponent } from './venta/venta.component';


@NgModule({
  imports: [
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    UIModule,
    CommonModule,
    DropdownModule
  ],
  declarations: [
    HomeComponent,
    VentaComponent
  ]
})
export class HomeModule { }
