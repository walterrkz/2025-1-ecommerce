import { Component, NgModule } from '@angular/core';
import { SneakersService } from '../../models/sneakers.service';
import { Sneaker } from '../../models/sneaker';
import { CardComponent } from '../../componentes/card/card.component';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../models/carrito.service';

@Component({
  selector: 'app-productos',
  imports: [CardComponent, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  sneakers!: Sneaker[];
  categoriaSeleccionada!: string;

  categorias = [
    { value: 'general', label: 'Generales' },
    { value: 'nuevo', label: 'Nuevos' },
    { value: 'limitados', label: 'Edición Limitada' },
    { value: 'oferta', label: 'Ofertas' },
  ];

  constructor(
    private sneakersService: SneakersService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.loadSneakers();
    const productOption = this.sneakersService.getProductOption();
    this.categoriaSeleccionada = productOption || 'todas';
    this.sneakersService.setProductOption('');
  }

  loadSneakers() {
    this.sneakers = this.sneakersService.getSneakers();
  }

  sneakersFiltrados(toSearch: string): Sneaker[] {
    return this.sneakers
      .filter(
        (s) =>
          this.categoriaSeleccionada === 'todas' ||
          s.categoria === this.categoriaSeleccionada
      )
      .filter(
        (s) =>
          !toSearch ||
          s.model.toLowerCase().includes(toSearch.toLowerCase()) ||
          s.marca.toLowerCase().includes(toSearch.toLowerCase())
      );
  }

  fnAddSneaker(sneaker: Sneaker): void {
    this.carritoService.agregarProducto(sneaker);
  }
}
