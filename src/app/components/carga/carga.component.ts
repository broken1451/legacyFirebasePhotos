import { Component, inject } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImgService } from '../../services/carga-img.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.scss'
})
export class CargaComponent {

  public archivo: FileItem[] = [];
  public estaSobreElemento = false;
  private cargaImgSVC = inject(CargaImgService);


  cargarImg(){
    this.cargaImgSVC.saveImageFirebase(this.archivo);
  }


  sobreElement(event: any){
    this.estaSobreElemento = event;
  }

  clean(){
    this.archivo = [];
  }
}
