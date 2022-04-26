import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantService } from '../../../constant/constant-service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TransactionService } from '../../../services/transaction.service';
import { Venta } from '../../../model/venta';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../../../model/cliente';
import { Producto } from '../../../model/producto';
import { VentaProducto } from '../../../model/venta-producto';
import { ListaProducto } from '../../../model/lista-producto';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventaDialog: boolean;
  newVenta: boolean;
  submitted: boolean;
  submittedProducto: boolean;
  loading: boolean;
  ventaForm: FormGroup;
  ventaProductoForm: FormGroup;
  ventas: Venta[];
  venta: Venta;
  selectedVentas: Venta[];
  totalRecords: Number;
  first: Number = 1;
  rows: Number = 10;
  last: Number = 1;
  cliente: Cliente;
  producto: Producto;
  cantidad: number;
  totalVenta: number;
  ventaProducto: VentaProducto;
  listaProducto: ListaProducto;
  listaProductos: ListaProducto[];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private messageService: MessageService,
    private constantService: ConstantService,
    private confirmationService: ConfirmationService
  ) {
    this.ventaForm = this.fb.group({
      id: [''],
      cliente: ['', Validators.required],
    });

    this.ventaProductoForm = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getVentas();
  }

  get f() {
    return this.ventaForm.controls;
  }

  get f2() {
    return this.ventaProductoForm.controls;
  }

  openNew() {
    this.submitted = false;
    this.ventaDialog = true;
    this.totalVenta = 0;
    this.venta = new Venta();
    this.venta.ventaProductos = [];
    this.listaProductos = [];
  }

  hideDialog() {
    this.ventaDialog = false;
    this.submitted = false;
  }

  saveVenta(venta: Venta) {
    this.submitted = true;
    this.loading = true;

    if (this.ventaForm.invalid || this.venta.ventaProductos.length < 1) {
      this.loading = false;
      return;
    }

    this.venta.clienteId = this.cliente.id;
    this.venta.total = this.totalVenta;

    this.transactionService
      .save(environment.facturacionAPI, this.constantService.VENTA_URL, this.venta)
      .subscribe(
        (data) => {
          if (data.responseDto.response === this.constantService.RESPONSE_OK) {
            this.submitted = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Estación',
              detail: data.responseDto.message
            });

            this.getVentas();
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Estación',
              detail:
                data.responseDto.message + ' , por favor inténtelo de nuevo!',
              life: 8000,
            });
          }

          this.loading = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Estación',
            detail: 'Por favor inténtelo de nuevo!',
            life: 8000,
          });

          this.loading = false;
        }
      );

    this.hideDialog();
  }

  editVenta(venta: Venta) {
    this.ventaDialog = true;
    this.newVenta = false;
  }

  private getVentas() {
    this.transactionService.getAll(environment.facturacionAPI, this.constantService.VENTA_URL).subscribe(
      (data) => {
        if (data.responseDto.response === this.constantService.RESPONSE_OK) {
          this.ventas = data.businessDto;
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Estación',
            detail: data.responseDto.message + ' , por favor inténtelo de nuevo!',
            life: 8000,
          });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Estación',
          detail: 'Por favor, intente más tarde.',
        });
      }
    );
  }

  addProducto(producto: Producto) {
    this.submittedProducto = true;
    this.loading = true;

    if (this.ventaProductoForm.invalid) {
      this.loading = false;
      return;
    }

    this.ventaProducto = new VentaProducto();
    this.ventaProducto.productoId = producto.id;
    this.ventaProducto.valorUnitario = producto.precio;
    this.ventaProducto.valorTotal = producto.precio * this.cantidad;
    this.venta.ventaProductos.push(this.ventaProducto);

    this.listaProducto = new ListaProducto();
    this.listaProducto.descripcion = producto.descripcion;
    this.listaProducto.valorUnitario = producto.precio;
    this.listaProducto.valorTotal = producto.precio * this.cantidad;
    this.listaProductos.push(this.listaProducto);

    this.calcularValorTotal();

    this.producto = null;
    this.cantidad = null;
    this.submittedProducto = false;
    this.loading = false;
  }

  calcularValorTotal() {
    this.totalVenta = 0;
    this.venta.ventaProductos.forEach(element => {
      this.totalVenta = this.totalVenta + element.valorTotal;
    });
  }

  receiveCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  receiveProducto(producto: Producto) {
    this.producto = producto;
  }
}
