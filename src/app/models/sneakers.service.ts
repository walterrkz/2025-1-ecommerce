import { Injectable } from '@angular/core';
import { Sneaker } from './sneaker';
import sneakersData from './sneakers.json';

@Injectable({
  providedIn: 'root'
})
export class SneakersService {

  constructor() { }

  sneakers:Sneaker[]=sneakersData;
  productOption!:string;

  getSneakers():Sneaker[]{
    return this.sneakers;
  }

  setProductOption(id: string) {
    this.productOption = id;
  }

  getProductOption():string{
    return this.productOption;
  }

}
