import { VentaProducto } from "./venta-producto";

export class Venta {
    id: Number;
    clienteId: number;
    total: number;

    ventaProductos: VentaProducto[];
}
