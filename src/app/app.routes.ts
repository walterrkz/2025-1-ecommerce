import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent, pathMatch: 'full' },
  { path: 'resenas', component: ResenasComponent, pathMatch: 'full' },
  { path: 'acerca', component: AcercaComponent, pathMatch: 'full' },
  { path: 'contacto', component:ContactoComponent, pathMatch: 'full' },
  { path: 'carrito', component:CarritoComponent, pathMatch: 'full' },
  { path: 'checkout', component:CheckoutComponent, pathMatch: 'full' },
  { path: 'confirmacion', component:ConfirmacionComponent, pathMatch: 'full' },
  { path: '**', component:NotFoundComponent},
];
