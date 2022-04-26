import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { DataViewModule } from 'primeng/dataview';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvButtonComponent } from './av-button/av-button.component';
import { AvCustomerComponent } from './av-customer/av-customer.component';
import { AvInputDateComponent } from './av-input-date/av-input-date.component';
import { AvProductoComponent } from './av-producto/av-producto.component';
import { AvInputNumberComponent } from './av-input-number/av-input-number.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    BreadcrumbComponent,
    AvButtonComponent,
    AvCustomerComponent,
    AvInputDateComponent,
    AvProductoComponent,
    AvInputNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    FieldsetModule,
    AutoCompleteModule,
    RadioButtonModule,
    InputTextareaModule,
    SelectButtonModule,
    DataViewModule,
    MultiSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    FieldsetModule,
    AutoCompleteModule,
    RadioButtonModule,
    InputTextareaModule,
    DataViewModule,
  ],
  exports: [
    BreadcrumbComponent,
    BreadcrumbComponent,
    AvButtonComponent,
    AvCustomerComponent,
    AvInputDateComponent,
    AvProductoComponent,
    AvInputNumberComponent
  ],
})

export class AvComponentsModule { }
