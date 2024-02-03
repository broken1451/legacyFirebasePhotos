import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable ,getStorage, UploadTask} from '@angular/fire/storage';
import { FileItem } from '../models/file-item';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CargaImgService {

  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private CARPETA_IMG = 'img';

  constructor(private http: HttpClient) { }

  // ...

  saveImageFirebase(images: FileItem[]) {
    console.log(images);
    const storage = getStorage();
    for (const item of images) {
      const mountainImagesRef = ref(storage, this.CARPETA_IMG + '/' + item.nombreArchivo);
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }
      const uploadTask: UploadTask = uploadBytesResumable(mountainImagesRef, item.file);
      uploadTask.on('state_changed', (snapshot) => {
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        console.error('Error al subir', error);
      }, async () => {
        console.log('Imagen cargada correctamente');
        item.estaSubiendo = false;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('URL de la imagen:', downloadURL);
        item.url = downloadURL;
        this.cargarImagenesFirebase({nombre: item.nombreArchivo, url: item.url});
      });
    }
  }

  cargarImagenesFirebase(image:{nombre: string, url: string}){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const docRef = addDoc(collection(db, "img"),image);
  }
}
