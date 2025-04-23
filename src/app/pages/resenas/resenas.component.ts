import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SneakersService } from '../../models/sneakers.service';
import { Resena } from '../../models/resena';
import Swal from 'sweetalert2';
import { ResenasService } from '../../models/resenas.service';
import { Sneaker } from '../../models/sneaker';

@Component({
  selector: 'app-resenas',
  imports: [ReactiveFormsModule],
  templateUrl: './resenas.component.html',
  styleUrl: './resenas.component.css',
})
export class ResenasComponent {
  userForm!: FormGroup;
  selectModel!: string[];
  calificacionSeleccionada: number = 0;
  resenaNueva!: Resena;
  resenas!: Resena[];
  sneakers!: Sneaker[];

  constructor(
    private sneakersService: SneakersService,
    public formBuilder: FormBuilder,
    private resenaService: ResenasService
  ) {
    this.userForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      comentario: ['', [Validators.required, Validators.minLength(10)]],
      calificacion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.selectModel = this.sneakersService.getSneakers().map((s) => s.model);
    this.resenas = this.resenaService.getResenas();
    this.sneakers=this.sneakersService.getSneakers();
  }

  seleccionarCalificacion(valor: number): void {
    this.calificacionSeleccionada = valor;
    this.userForm.get('calificacion')?.setValue(valor);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Tu reseña ha sido enviada',
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
        customClass: {
          confirmButton: 'btn-submit',
        },
      });
      this.resenaNueva = {
        modelo: this.userForm.value.modelo,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        comentario: this.userForm.value.comentario,
        calificacion: this.calificacionSeleccionada,
      };
      this.resenaService.agregarResena(this.resenaNueva);
      this.resenaNueva = this.resenaService.clearResenaNueva();
      this.userForm.reset();
      this.calificacionSeleccionada = 0;
    }
  }

  getSneakerInfo(modelo: string) {
    const sneaker = this.sneakers.find((s) => s.model === modelo)!;
    return {
      img: sneaker.img,
      marca: sneaker.marca,
    };
  }

  removeResena(id:number):void{
    this.resenaService.removeResena(id);
    this.resenas=this.resenaService.getResenas();
  }

}
