import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sneaker } from '../../models/sneaker';

@Component({
  selector: 'app-modal-add',
  imports: [],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css',
})
export class ModalAddComponent {
  @Input() sneaker!: Sneaker;
  @Output() addToCartSneaker = new EventEmitter<Sneaker>();

  fnOnAgregarAlCarrito(): void {
    this.addToCartSneaker.emit(this.sneaker);
  }
}
