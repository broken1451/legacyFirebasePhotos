import { Directive, EventEmitter, ElementRef, HostListener, Input, Output} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseSobreElemento: EventEmitter<boolean> = new EventEmitter();
  @Input() archivos: FileItem[] = []; // archivos es un array de tipo FileItem y son los archivos a controlar 

  constructor() {
    console.log("it's wokrking")
   }

  @HostListener('dragover', ['$event']) 
  public onDragEnter(eventData: Event) {
    this._prevenirDetener(eventData);
    this.mouseSobreElemento.emit(true);
  }

  @HostListener('dragleave', ['$event']) 
  public onDragLeave(eventData: Event) {
    this.mouseSobreElemento.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(eventData: Event) {
    const transferencia = this._getTransferencia(eventData);
    if(!transferencia){
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(eventData);
    this.mouseSobreElemento.emit(false);
  }


  /**
   * Obtiene el objeto de transferencia de datos del evento. para compatibilidad con navegadores.
   * 
   * @param event El evento que contiene los datos de transferencia.
   * @returns El objeto de transferencia de datos.
   */
  private _getTransferencia(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }



  private _extraerArchivos(archivosLista: FileList){
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      // console.log (propiedad);
      const archivoTemporal = archivosLista[propiedad];
      // console.log (archivoTemporal);
      if(this._archivoPuedeSerCargado(archivoTemporal)){
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }

  // Validaciones
  private _archivoPuedeSerCargado(archivo: File): boolean{
    if(!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }else{
      return false;
    }
  }

  private _prevenirDetener(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDropeado(nombre:string): boolean{
    for(const archivo of this.archivos){
      if(archivo.nombreArchivo === nombre){
        console.log(`El archivo ${nombre} ya está agregado`);
        return true;
      }
    }
    return false;
  }


  private _esImagen(tipoArchivo: string): boolean{
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
