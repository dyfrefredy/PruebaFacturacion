import { Component, forwardRef, ViewChild, ElementRef, NgZone, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ConstantService } from '../../constant/constant-service';
import { Cliente } from '../../model/cliente';
import { TransactionService } from '../../services/transaction.service';

export const AV_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AvCustomerComponent),
  multi: true,
};

@Component({
  selector: 'av-customer',
  templateUrl: './av-customer.component.html',
  providers: [AV_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class AvCustomerComponent implements OnInit {
  @Input() label: string;
  @Input() labelList: string;
  @Input() options: Cliente[];
  @Input() disabled: boolean = false;
  @Input() minLength: Number = 1;
  @Input() filter: boolean = true;
  @Input() active: boolean = true;
  @Input() principal: boolean = true;
  @Input() selectionLabel: string;
  @Input() selectedCustomers: Cliente[];
  @Input() selectioncustomersAvailable: Cliente;
  @Input() control: FormControl;
  @Output() sendCustomer: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  @Input() dropdown: boolean = true;
  @ViewChild('input') inputRef: ElementRef;

  constructor(private zone: NgZone, private transactionService: TransactionService, private constantService: ConstantService) {
  }

  ngOnInit(): void {
  }

  getCustomerByName(query: String) {
    this.transactionService.GetList(environment.facturacionAPI, this.constantService.CLIENTE_URL, '/GetClienteByName/' + query).subscribe(
      (data) => {
        if (data.responseDto.response === this.constantService.RESPONSE_OK) {
          this.options = data.businessDto;
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  propagateChange = (_: any) => { };
  onTouched = () => { };

  filterCustomerByName(event) {
    if (event.query.length >= this.minLength) {
      this.getCustomerByName(event.query);
    }
  }

  writeValue(value: any): void {
    this.selectioncustomersAvailable = value;
  }

  onSelect(value: any): void {
    this.zone.run(() => {
      this.propagateChange(value);
      this.selectioncustomersAvailable = value;
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClear() {
    this.selectioncustomersAvailable = new Cliente();
    this.sendCustomer.emit(this.selectioncustomersAvailable);
  }

  myCustomDisplay(item: Cliente): string {
    if (item.nombre != null)
      return `${item.nombre} ${item.apellido}`;
  }
}
