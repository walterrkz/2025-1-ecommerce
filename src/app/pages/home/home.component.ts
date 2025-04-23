import { Component } from '@angular/core';
import { CarruselComponent } from '../../componentes/carrusel/carrusel.component';
import { SneakersService } from '../../models/sneakers.service';
import { Sneaker } from '../../models/sneaker';
import { CarruselSneakersComponent } from '../../componentes/carrusel-sneakers/carrusel-sneakers.component';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../models/carrito.service';

@Component({
  selector: 'app-home',
  imports: [CarruselComponent, CarruselSneakersComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sneakers!: Sneaker[];

  constructor(
    private sneakersService: SneakersService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.loadSneakers();
  }

  loadSneakers() {
    this.sneakers = this.sneakersService.getSneakers();
  }

  getSneakersFull(): Sneaker[] {
    return this.sneakers;
  }

  getSneakersNuevos(): Sneaker[] {
    return this.sneakers.filter((s) => s.categoria === 'nuevo');
  }

  getSneakersLimitados(): Sneaker[] {
    return this.sneakers.filter((s) => s.categoria === 'limitados');
  }

  getSneakersOferta(): Sneaker[] {
    return this.sneakers.filter((s) => s.categoria === 'oferta');
  }

  getSneakersGenerales(): Sneaker[] {
    return this.sneakers.filter((s) => s.categoria === 'general');
  }

  onVerMas(event: Event): void {
    const id = (event.target as HTMLElement).id;
    this.sneakersService.setProductOption(id);
  }

  fnAddSneaker(sneaker: Sneaker): void {
    this.carritoService.agregarProducto(sneaker);
  }
}
