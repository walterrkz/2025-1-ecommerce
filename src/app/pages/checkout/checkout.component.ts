import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarritoService } from '../../models/carrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  checkoutOn!: boolean;
  purchaseInfo!: any;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', [Validators.required, this.mayorDeEdadValidator]],
      numeroTarjeta: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ],
      fechaVencimiento: ['', [Validators.required, this.fechaValidaValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  mayorDeEdadValidator(control: any) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const cumpleEsteAnio = new Date(
      hoy.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );
    if (edad > 18 || (edad === 18 && hoy >= cumpleEsteAnio)) {
      return null;
    }
    return { menorDeEdad: true };
  }

  fechaValidaValidator(control: any) {
    const valor = control.value;
    if (!/^\d{2}\/\d{2}$/.test(valor)) return { formatoInvalido: true };

    const [mesStr, anioStr] = valor.split('/');
    const mes = parseInt(mesStr, 10);
    const anio = parseInt(anioStr, 10) + 2000;

    if (mes < 1 || mes > 12) return { mesInvalido: true };

    const hoy = new Date();
    const fecha = new Date(anio, mes);
    if (fecha < hoy) return { tarjetaVencida: true };

    return null;
  }

  ngOnInit() {
    if (this.carritoService.getCarritoProducts().length > 0) {
      this.checkoutOn = true;
    }
  }

  onSubmit(): void {
    const formData = this.checkoutForm.value;
    this.purchaseInfo = {
      ...formData,
      carrito: this.carritoService.getCarritoProducts(),
    };
    this.carritoService.addPurchaseInfo(this.purchaseInfo);
    this.checkoutForm.reset();
    this.purchaseInfo = null;
    Swal.fire({
      icon: 'success',
      title: 'Compra exitosa',
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      customClass: {
        confirmButton: 'btn-submit',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/confirmacion']);
      }
    });
  }
}
