import { Component, Input, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SneakersService } from '../models/sneakers.service';
import { CarritoService } from '../models/carrito.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  elementosCarroIn!: Signal<number>;

  constructor(
    private sneakersService: SneakersService,
    private router: Router,
    private carrito: CarritoService
  ) {
    this.elementosCarroIn = this.carrito.counterProductos;
  }

  onVerMas(event: Event): void {
    const id = (event.target as HTMLElement).id;

    if (this.router.url === '/productos') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/productos']);
      });
    } else {
      this.router.navigate(['/productos']);
    }

    this.sneakersService.setProductOption(id);
  }
}
