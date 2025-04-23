import { Component } from '@angular/core';
import { CarritoService } from '../../models/carrito.service';
import { Carrito } from '../../models/carrito';
import { CarritoQty } from '../../models/carritoext';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  carritoCompleto!: Carrito[];
  carritoResumen!: CarritoQty[];
  totalQty!: number;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.fnUpdateCarritoSummary();
  }

  fnUpdateCarritoSummary(): void {
    this.carritoCompleto = this.carritoService.getCarritoProducts();
    this.carritoResumen = this.carritoCompleto
      .filter(
        (item, idx, arr) => idx === arr.findIndex((i) => i.id === item.id)
      )
      .map((item) => ({
        ...item,
        cantidad: this.carritoCompleto.filter((i) => i.id === item.id).length,
      }));
    this.totalQty = this.carritoResumen.reduce(
      (tot, i) => tot + i.importe * i.cantidad,
      0
    );
  }

  onBtnAdd(id: number) {
    const sneaker = this.carritoService.retrieveSneaker(id);
    this.carritoService.agregarProducto(sneaker);
    this.fnUpdateCarritoSummary();
  }

  onBtnRemove(id: number) {
    const sneaker = this.carritoService.retrieveSneaker(id);
    const cantidad = this.carritoResumen.find(
      (item) => item.id === id
    )?.cantidad;
    if (cantidad === 1) {
      Swal.fire({
        title: '¿Deseas eliminar este producto?',
        text: 'Esta acción eliminará el producto del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn-submit',
          cancelButton: 'btn-cancelar',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.carritoService.removerProducto(sneaker);
          this.fnUpdateCarritoSummary();
        }
      });
    } else {
      this.carritoService.removerProducto(sneaker);
      this.fnUpdateCarritoSummary();
    }
  }
}
