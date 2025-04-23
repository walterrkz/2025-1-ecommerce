import { Injectable, signal } from '@angular/core';
import { Carrito } from './carrito';
import { Sneaker } from './sneaker';
import sneakersData from './sneakers.json';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  productosCarrito!: Carrito[];
  counterProductos=signal<number>(0);
  sneakers:Sneaker[]=sneakersData;
  purchaseList!:any[];
  purchaseConfirm!:any;

  constructor() {
    this.productosCarrito = [];
    this.counterProductos.set(this.productosCarrito.length);
    this.purchaseList = JSON.parse(localStorage.getItem('compras') || '[]');
  }

  getCarritoProducts() {
    return this.productosCarrito;
  }

  agregarProducto(sneaker: Sneaker) {
    const productoCarrito: Carrito = {
      id: sneaker.id,
      model: sneaker.model,
      marca: sneaker.marca,
      categoria: sneaker.categoria,
      img: sneaker.img,
      importe:
        Math.round(sneaker.precio * (1 - sneaker.descuento / 100) * 100) / 100,
    };
    this.productosCarrito.push(productoCarrito);
    this.counterProductos.set(this.productosCarrito.length);
  }

  retrieveSneaker(id:number):Sneaker{
    const sneaker:Sneaker=this.sneakers.find(s=>s.id===id)!;
    return sneaker
  }

  removerProducto(sneaker:Sneaker){
    const index=this.productosCarrito.findIndex(s=>s.id===sneaker.id);
    this.productosCarrito.splice(index,1);
    this.counterProductos.set(this.productosCarrito.length);
  }

  addPurchaseInfo(info: any): void {
    this.purchaseList.push(info);
    localStorage.setItem('compras', JSON.stringify(this.purchaseList));
    this.productosCarrito=[];
    this.counterProductos.set(this.productosCarrito.length);
    this.purchaseConfirm=info;
  }

  getPurchaseConfirm(){
    return this.purchaseConfirm;
  }

  resetPurchaseConfirm(){
    this.purchaseConfirm=null;
  }

}
