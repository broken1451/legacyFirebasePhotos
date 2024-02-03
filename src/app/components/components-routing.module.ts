import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'fotos', pathMatch: 'full' },
  { path: 'fotos', loadChildren: () => import('./fotos/fotos.module').then(m => m.FotosModule) },
  { path: 'carga', loadChildren: () => import('./carga/carga.module').then(m => m.CargaModule) },

  { path: '**', redirectTo: 'fotos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
