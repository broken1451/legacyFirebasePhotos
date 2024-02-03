import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotosRoutingModule } from './fotos-routing.module';
import { FotosComponent } from './fotos.component';


@NgModule({
  declarations: [
    FotosComponent
  ],
  imports: [
    CommonModule,
    FotosRoutingModule
  ]
})
export class FotosModule { }
