export class FileItem {

    public file!: File; // archivo fisico que se  esta seleccionando el cual se subira
    public nombreArchivo!: string;
    public url!: string;
    public estaSubiendo!: boolean;
    public progreso!: number;

    constructor(archivo: File) { // archivo: File es el archivo que se esta subiendo y la propiedad es obligatoria
        this.file = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0;
    }
}