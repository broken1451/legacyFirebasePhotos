import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.scss'
})
export class FotosComponent implements OnInit{


  firestore: Firestore = inject(Firestore)
  items$!: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.getPhotos()
  }


  getPhotos() {
    const aCollection = collection(this.firestore, 'img')
    return this.items$ = collectionData(aCollection);
  }

}
