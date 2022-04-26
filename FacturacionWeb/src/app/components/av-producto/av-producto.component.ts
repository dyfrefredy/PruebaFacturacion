import { Component, forwardRef, ViewChild, ElementRef, NgZone, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ConstantService } from '../../constant/constant-service';
import { Producto } from '../../model/producto';
import { TransactionService } from '../../services/transaction.service';

export const AV_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AvProductoComponent),
  multi: true,
};

@Component({
  selector: 'av-producto',
  templateUrl: './av-producto.component.html',
  providers: [AV_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class AvProductoComponent implements OnInit {
  @Input() label: string;
  @Input() labelList: string;
  @Input() options: Producto[];
  @Input() disabled: boolean = false;
  @Input() minLength: Number = 1;
  @Input() filter: boolean = true;
  @Input() active: boolean = true;
  @Input() principal: boolean = true;
  @Input() selectionLabel: string;
  @Input() selectedProductos: Producto[];
  @Input() selectionproductosAvailable: Producto;
  @Input() control: FormControl;
  @Output() sendProducto: EventEmitter<Producto> = new EventEmitter<Producto>();
  @Input() dropdown: boolean = true;
  @Input() inputField: string = "";

  @ViewChild('input') inputRef: ElementRef;

  constructor(private zone: NgZone, private transactionService: TransactionService, private constantService: ConstantService) {
  }

  ngOnInit(): void {
  }

  getProductoByName(query: String) {
    this.transactionService.GetList(environment.facturacionAPI, this.constantService.PRODUCTO_URL, '/GetProductoByName/' + query).subscribe(
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

  filterProductoByName(event) {
    if (event.query.length >= this.minLength) {
      this.getProductoByName(event.query);
    }
  }

  writeValue(value: any): void {
    this.selectionproductosAvailable = value;
  }

  onSelect(value: any): void {
    this.zone.run(() => {
      this.propagateChange(value);
      this.selectionproductosAvailable = value;
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
    this.selectionproductosAvailable = new Producto();
    this.sendProducto.emit(this.selectionproductosAvailable);
  }
}
