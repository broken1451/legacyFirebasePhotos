import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaRoutingModule } from './carga-routing.module';
import { CargaComponent } from './carga.component';
import { NgDropFilesDirective } from '../../directive/ng-drop-files.directive';


@NgModule({
  declarations: [
    CargaComponent,
    NgDropFilesDirective
  ],
  imports: [
    CommonModule,
    CargaRoutingModule
  ]
})
export class CargaModule { }
