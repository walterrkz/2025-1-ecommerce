import { Component } from '@angular/core';
import { CarritoService } from '../../models/carrito.service';

@Component({
  selector: 'app-confirmacion',
  imports: [],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {

  purchaseToDisplay!:any;
  
  constructor(private carritoService:CarritoService){
    this.purchaseToDisplay=this.carritoService.getPurchaseConfirm();
  }

  ngOnDestroy(){
    this.carritoService.resetPurchaseConfirm;
    this.purchaseToDisplay=null;
  }

}
