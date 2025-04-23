import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sneaker } from '../../models/sneaker';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-carrusel-sneakers',
  imports: [CardComponent],
  templateUrl: './carrusel-sneakers.component.html',
  styleUrl: './carrusel-sneakers.component.css',
})
export class CarruselSneakersComponent {
  @Input() sneakersIn!: Sneaker[];
  @Input() idCarrusel!:string;
  @Output() sneakerToAdd = new EventEmitter<Sneaker>();

  carrouselItems:number=4;

  fnGetItemsNumber(sneakers: Sneaker[]): any[] {
    const size = Math.ceil(sneakers.length / this.carrouselItems);
    const array = new Array(size).fill(0);
    return array;
  }

  fnGetItems(i: number, sneakers:Sneaker[]): Sneaker[] {
    const start = i * this.carrouselItems;
    const end = start + this.carrouselItems;
    let subSetSneakers: Sneaker[] = [];
    subSetSneakers = sneakers.slice(start, end);
    return subSetSneakers;
  }

  fnAddSneaker(sneaker:Sneaker):void{
    this.sneakerToAdd.emit(sneaker);
  }

}
