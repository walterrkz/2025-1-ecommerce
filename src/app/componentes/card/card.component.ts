import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sneaker } from '../../models/sneaker';
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from "../modal-add/modal-add.component";

@Component({
  selector: 'app-card',
  imports: [CommonModule, ModalAddComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input()sneaker!:Sneaker;
  @Output() sneakerToAdd = new EventEmitter<Sneaker>();

  fnAddSneaker(sneaker:Sneaker):void{
    this.sneakerToAdd.emit(sneaker);
  }

}
