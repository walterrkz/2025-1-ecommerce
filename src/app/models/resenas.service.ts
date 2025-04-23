import { Injectable } from '@angular/core';
import { Resena } from './resena';

@Injectable({
  providedIn: 'root',
})
export class ResenasService {
  resenas!: Resena[];

  constructor() {
    this.resenas = JSON.parse(localStorage.getItem('resenas') || '[]');
  }

  getResenas() {
    return this.resenas;
  }

  agregarResena(resena: Resena) {
    this.resenas.push(resena);
    localStorage.setItem('resenas', JSON.stringify(this.resenas));
  }

  removeResena(id: number) {
    const removeResena = this.getResenas();
    removeResena.splice(id, 1);
    localStorage.setItem('resenas', JSON.stringify(removeResena));
  }

  clearResenaNueva(): Resena {
    return {
      modelo: '',
      name: '',
      email: '',
      comentario: '',
      calificacion: 0,
    };
  }
}
